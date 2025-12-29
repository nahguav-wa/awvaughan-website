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

## Contact Form Email Sending Options

Since MS365 is handling your regular email, you have several options for sending transactional emails from the contact form:

### Option 1: Cloudflare Email Workers

> **⚠️ Important**: Cloudflare Email Routing cannot be used simultaneously with MS365 MX records. If you enable Cloudflare Email Routing, it will change your MX records and break MS365 email delivery. Use this option only if you want to send transactional emails through Cloudflare Workers WITHOUT using Email Routing.

**Alternative Approach**: Use Cloudflare Workers with the MailChannels integration (or similar) to send transactional emails while keeping MS365 for regular email:

1. **Keep MS365 MX Records**
   - Do NOT enable Cloudflare Email Routing
   - Keep your MS365 MX records as configured above

2. **Use Third-Party SMTP in Worker**
   - Configure your Worker to use an external SMTP service
   - Services like MailChannels, SendGrid, or Resend can be used from Workers
   - This keeps your MS365 email intact

**Not Recommended** for this setup due to MX record conflicts.

### Option 2: Third-Party Email Services (Recommended for MS365 Setup)

These services work perfectly alongside MS365 for transactional emails. They don't interfere with your MS365 MX records and are designed for sending automated emails from applications.

#### Using SendGrid

```typescript
// Install: npm install @sendgrid/mail
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: 'alex.vaughan@awvaughan.com',
  from: 'noreply@awvaughan.com',
  subject: `Contact Form: ${sanitizedData.subject}`,
  text: emailContent,
  replyTo: sanitizedData.email
});
```

#### Using Resend

```typescript
// Install: npm install resend
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@awvaughan.com',
  to: 'alex.vaughan@awvaughan.com',
  subject: `Contact Form: ${sanitizedData.subject}`,
  text: emailContent,
  reply_to: sanitizedData.email
});
```

#### Using Mailgun

```typescript
// Install: npm install mailgun-js
import mailgun from 'mailgun-js';

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

await mg.messages().send({
  from: 'noreply@awvaughan.com',
  to: 'alex.vaughan@awvaughan.com',
  subject: `Contact Form: ${sanitizedData.subject}`,
  text: emailContent,
  'h:Reply-To': sanitizedData.email
});
```

#### Using Microsoft 365 SMTP

You can also use MS365's SMTP server directly to send emails:

```typescript
// Install: npm install nodemailer
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.MS365_EMAIL, // Your MS365 email
    pass: process.env.MS365_PASSWORD // App password or account password
  }
});

await transporter.sendMail({
  from: process.env.MS365_EMAIL,
  to: 'alex.vaughan@awvaughan.com',
  subject: `Contact Form: ${sanitizedData.subject}`,
  text: emailContent,
  replyTo: sanitizedData.email
});
```

> **Note**: For MS365 SMTP, you may need to create an app password in your Microsoft account security settings, especially if you have MFA enabled.

## Development/Testing

During development, the form will still work but emails won't be sent. The form data will be logged to the console instead. The user will still see a success message.

To test email functionality locally:
1. Set up a test email service account
2. Add environment variables
3. Update the API endpoint to use your test service

## Environment Variables

If using third-party email services, add these to your Cloudflare Pages environment variables:

- `SENDGRID_API_KEY` (for SendGrid)
- `RESEND_API_KEY` (for Resend)
- `MAILGUN_API_KEY` and `MAILGUN_DOMAIN` (for Mailgun)
- `MS365_EMAIL` and `MS365_PASSWORD` (for Microsoft 365 SMTP)

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
- **If using SendGrid/Resend/Mailgun**: Verify API keys are set in environment variables
- **If using MS365 SMTP**:
  - Confirm SMTP settings (host: smtp.office365.com, port: 587)
  - Check that the account has SMTP AUTH enabled (MS365 admin center)
  - Verify you're using an app password if MFA is enabled
  - Check MS365 allows sending from the application
- Check that the `from` address is from your verified domain
- Review server logs in Cloudflare Pages dashboard

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
- [MS365 DNS Records Documentation](https://learn.microsoft.com/en-us/microsoft-365/admin/get-help-with-domains/create-dns-records-at-any-dns-hosting-provider)
- [MS365 SMTP Settings](https://learn.microsoft.com/en-us/exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-microsoft-365-or-office-365)
- [Microsoft Remote Connectivity Analyzer](https://testconnectivity.microsoft.com)

### Cloudflare
- [Cloudflare DNS Documentation](https://developers.cloudflare.com/dns/)
- [Managing DNS Records in Cloudflare](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/)

### Email Services
- [SendGrid Documentation](https://docs.sendgrid.com/)
- [Resend Documentation](https://resend.com/docs)
- [Mailgun Documentation](https://documentation.mailgun.com/)

### Development
- [SvelteKit API Routes Documentation](https://kit.svelte.dev/docs/routing#server)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
