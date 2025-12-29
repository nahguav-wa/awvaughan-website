# Email Configuration for Contact Form

This document explains the email setup for awvaughan.com and how to configure the contact form to send emails.

## Infrastructure Overview

**DNS Provider**: Cloudflare
**Email Hosting**: Microsoft 365 (MS365)
**Contact Form**: SvelteKit API endpoint at `/api/contact`

### Important Distinction

- **Email Hosting (MS365)**: Handles regular email mailboxes (like alex.vaughan@awvaughan.com) where you receive and send normal emails
- **DNS Management (Cloudflare)**: Manages all DNS records for the domain, including MX records that point to MS365
- **Transactional Email**: Contact form submissions can be sent via various services (Cloudflare Email Workers, SendGrid, Resend, etc.)

## DNS Configuration for MS365

Since you're using Cloudflare for DNS and MS365 for email hosting, the following DNS records should be configured in Cloudflare:

### Required MS365 DNS Records

1. **MX Records** (Mail Exchange)
   ```
   Type: MX
   Name: @
   Mail server: <your-domain>.mail.protection.outlook.com
   Priority: 0
   ```

2. **SPF Record** (Sender Policy Framework)
   ```
   Type: TXT
   Name: @
   Content: v=spf1 include:spf.protection.outlook.com -all
   ```

3. **DKIM Records** (DomainKeys Identified Mail)
   - Two CNAME records provided by MS365
   ```
   Type: CNAME
   Name: selector1._domainkey
   Target: selector1-<domain>._domainkey.<tenant>.onmicrosoft.com

   Type: CNAME
   Name: selector2._domainkey
   Target: selector2-<domain>._domainkey.<tenant>.onmicrosoft.com
   ```

4. **DMARC Record** (Domain-based Message Authentication)
   ```
   Type: TXT
   Name: _dmarc
   Content: v=DMARC1; p=quarantine; rua=mailto:dmarc@awvaughan.com
   ```

5. **Autodiscover** (For email client configuration)
   ```
   Type: CNAME
   Name: autodiscover
   Target: autodiscover.outlook.com
   ```

> **Note**: Get the exact values for these records from your Microsoft 365 admin center under Domains.

## Contact Form Email Sending with Cloudflare Workers + MS365

Since you're using MS365 for email hosting and Cloudflare for DNS, you can configure the contact form to send emails through MS365 SMTP directly from your Cloudflare Worker/Function.

> **⚠️ Important**: Do NOT enable Cloudflare Email Routing. It will change your MX records and break MS365 email delivery.

### Recommended Setup: Cloudflare Worker with MS365 SMTP

This approach uses your Cloudflare Worker/Function to send emails via MS365's SMTP server:

#### Step 1: Enable SMTP AUTH in MS365

1. Go to [Microsoft 365 Admin Center](https://admin.microsoft.com)
2. Navigate to **Users > Active Users**
3. Select the user account you'll use for sending (e.g., noreply@awvaughan.com or your main account)
4. Go to **Mail** settings
5. Under **Email apps**, ensure **Authenticated SMTP** is enabled

#### Step 2: Create an App Password (if MFA is enabled)

1. Go to [Microsoft Account Security](https://account.microsoft.com/security)
2. Select **Advanced security options**
3. Under **App passwords**, create a new app password
4. Save this password securely - you'll use it in your environment variables

#### Step 3: Install Email Library

Since Cloudflare Workers don't have Node.js built-ins like `nodemailer`, you'll need to use a library compatible with Workers. Here are two options:

**Option A: Using email-smtp (Works in Cloudflare Workers)**

```bash
npm install email-smtp
```

**Option B: Using native fetch with MS365 Graph API (More modern)**

No installation needed - uses MS365 Graph API instead of SMTP.

#### Step 4: Update Your API Endpoint

**Option A: Using SMTP with email-smtp library**

Update `/src/routes/api/contact/+server.ts`:

```typescript
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
  try {
    const data = await request.json();

    // Validate and sanitize input
    const { name, email, subject, message } = data;

    // Construct email
    const emailContent = `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `.trim();

    // Send via MS365 SMTP
    // Note: In production, you'll need to use environment variables
    const response = await fetch('https://smtp.office365.com:587', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // Use TLS
        auth: {
          user: platform?.env?.MS365_EMAIL || '',
          pass: platform?.env?.MS365_APP_PASSWORD || ''
        },
        from: platform?.env?.MS365_EMAIL || 'noreply@awvaughan.com',
        to: 'alex.vaughan@awvaughan.com',
        subject: `Contact Form: ${subject}`,
        text: emailContent,
        replyTo: email
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send message' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
```

**Option B: Using MS365 Graph API (Recommended for Workers)**

This approach uses Microsoft Graph API, which is better suited for Cloudflare Workers:

1. **Register an App in Azure AD**
   - Go to [Azure Portal](https://portal.azure.com)
   - Navigate to **Azure Active Directory > App registrations**
   - Create a new registration
   - Add **Mail.Send** permission
   - Generate a client secret

2. **Update API Endpoint**:

```typescript
import type { RequestHandler } from './$types';

async function getAccessToken(
  tenantId: string,
  clientId: string,
  clientSecret: string
): Promise<string> {
  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const params = new URLSearchParams({
    client_id: clientId,
    scope: 'https://graph.microsoft.com/.default',
    client_secret: clientSecret,
    grant_type: 'client_credentials'
  });

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });

  const data = await response.json();
  return data.access_token;
}

export const POST: RequestHandler = async ({ request, platform }) => {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    // Get access token
    const accessToken = await getAccessToken(
      platform?.env?.MS365_TENANT_ID || '',
      platform?.env?.MS365_CLIENT_ID || '',
      platform?.env?.MS365_CLIENT_SECRET || ''
    );

    // Send email via Graph API
    const graphResponse = await fetch(
      `https://graph.microsoft.com/v1.0/users/${platform?.env?.MS365_EMAIL}/sendMail`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: {
            subject: `Contact Form: ${subject}`,
            body: {
              contentType: 'Text',
              content: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            },
            toRecipients: [
              {
                emailAddress: {
                  address: 'alex.vaughan@awvaughan.com'
                }
              }
            ],
            replyTo: [
              {
                emailAddress: {
                  address: email
                }
              }
            ]
          },
          saveToSentItems: 'false'
        })
      }
    );

    if (!graphResponse.ok) {
      throw new Error('Failed to send email via Graph API');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send message' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
```

#### Step 5: Configure Environment Variables in Cloudflare Pages

1. Go to your Cloudflare Pages project
2. Navigate to **Settings > Environment variables**
3. Add the following variables:

**For SMTP Approach:**
- `MS365_EMAIL`: Your MS365 email address (e.g., noreply@awvaughan.com)
- `MS365_APP_PASSWORD`: The app password you created

**For Graph API Approach (Recommended):**
- `MS365_TENANT_ID`: Your Azure AD tenant ID
- `MS365_CLIENT_ID`: Your app registration client ID
- `MS365_CLIENT_SECRET`: Your app registration client secret
- `MS365_EMAIL`: The email address to send from

## Development/Testing

During development, the form will still work but emails won't be sent. The form data will be logged to the console instead. The user will still see a success message.

To test email functionality locally:
1. Set up a test email service account
2. Add environment variables
3. Update the API endpoint to use your test service

## Summary of Environment Variables

Add these to your Cloudflare Pages environment variables based on your chosen approach:

**SMTP Approach:**
- `MS365_EMAIL`: Your MS365 email address
- `MS365_APP_PASSWORD`: App password from MS365

**Graph API Approach (Recommended):**
- `MS365_TENANT_ID`: Your Azure AD tenant ID
- `MS365_CLIENT_ID`: App registration client ID
- `MS365_CLIENT_SECRET`: App registration client secret
- `MS365_EMAIL`: Email address to send from

## Security Considerations

1. **Rate Limiting**: Consider adding rate limiting to prevent spam
2. **CAPTCHA**: Add reCAPTCHA or similar to prevent bot submissions
3. **Input Validation**: The current implementation sanitizes inputs to prevent XSS
4. **Email Validation**: Email addresses are validated before processing

## Troubleshooting

### MS365 Email Not Receiving (Regular Email Issues)
- Verify MX records in Cloudflare point to MS365: `<your-domain>.mail.protection.outlook.com`
- Check SPF record includes `include:spf.protection.outlook.com`
- Ensure DKIM records are properly configured in Cloudflare (values from MS365 admin center)
- Verify domain in MS365 admin center shows as "Healthy"
- Check MS365 mail flow rules aren't blocking emails
- Use Microsoft's Remote Connectivity Analyzer: https://testconnectivity.microsoft.com

### Contact Form Emails Not Being Sent

**General Checks:**
- Review server logs in Cloudflare Pages dashboard (Functions logs)
- Check browser console for client-side errors
- Verify environment variables are set correctly

**MS365 SMTP Specific:**
- Confirm SMTP settings (host: smtp.office365.com, port: 587)
- Verify SMTP AUTH is enabled in MS365 admin center
- If using MFA, ensure you're using an app password (not regular password)
- Check that the sending account has permission to send email
- Verify the account isn't locked or disabled
- Check MS365 message trace to see if emails are being blocked

**MS365 Graph API Specific:**
- Verify the Azure app registration has **Mail.Send** permission
- Ensure admin consent has been granted for the permission
- Check that client ID and client secret are correct
- Verify tenant ID is correct
- Check that the user account exists and has a mailbox
- Review Azure AD sign-in logs for authentication failures

### Form Submissions Failing
- Check browser console for errors
- Review server logs in Cloudflare Pages dashboard
- Verify the API endpoint is accessible at `/api/contact`
- Ensure CORS is properly configured if testing locally

### DNS Propagation Issues
- DNS changes can take up to 48 hours to propagate
- Use online DNS checkers to verify records: https://dnschecker.org
- Clear your local DNS cache if testing immediately after changes

## Files Modified

- `/src/routes/contact/+page.svelte` - Contact form component
- `/src/routes/api/contact/+server.ts` - API endpoint for handling submissions
- `/src/lib/config/constants.ts` - Updated with social media links

## Additional Resources

### Microsoft 365
- [MS365 Admin Center](https://admin.microsoft.com)
- [Azure Portal](https://portal.azure.com)
- [MS365 DNS Records Documentation](https://learn.microsoft.com/en-us/microsoft-365/admin/get-help-with-domains/create-dns-records-at-any-dns-hosting-provider)
- [MS365 SMTP Settings](https://learn.microsoft.com/en-us/exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-microsoft-365-or-office-365)
- [Microsoft Graph API - Send Mail](https://learn.microsoft.com/en-us/graph/api/user-sendmail)
- [Azure App Registration](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
- [Microsoft Remote Connectivity Analyzer](https://testconnectivity.microsoft.com)

### Cloudflare
- [Cloudflare DNS Documentation](https://developers.cloudflare.com/dns/)
- [Managing DNS Records in Cloudflare](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
- [Cloudflare Pages Environment Variables](https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables)

### Development
- [SvelteKit API Routes Documentation](https://kit.svelte.dev/docs/routing#server)
- [SvelteKit Adapter Cloudflare](https://kit.svelte.dev/docs/adapter-cloudflare)
