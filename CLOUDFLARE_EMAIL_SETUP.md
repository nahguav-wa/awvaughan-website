# Cloudflare Email Setup for Contact Form

This document explains how to set up Cloudflare Email Workers to handle contact form submissions from the website.

## Overview

The contact form (`/contact`) submits data to `/api/contact`, which is handled by a SvelteKit API endpoint. This endpoint can send emails using Cloudflare's Email Workers when properly configured.

## Setup Instructions

### Option 1: Cloudflare Email Workers (Recommended for Production)

1. **Enable Cloudflare Email Routing**
   - Go to your Cloudflare dashboard
   - Navigate to your domain (awvaughan.com)
   - Go to Email → Email Routing
   - Enable Email Routing and verify your domain
   - Set up a destination address (e.g., alex.vaughan@awvaughan.com)

2. **Configure Email Sending**
   - In your Cloudflare dashboard, go to Workers & Pages
   - Select your Pages project
   - Go to Settings → Functions → Email Bindings
   - Add a new Email binding named `CONTACT_EMAIL`

3. **Update wrangler.toml (if using Cloudflare Pages)**

   Add the following to your `wrangler.toml`:

   ```toml
   [[send_email]]
   name = "CONTACT_EMAIL"
   destination_address = "alex.vaughan@awvaughan.com"
   allowed_destination_addresses = ["alex.vaughan@awvaughan.com"]
   ```

4. **Verify Sending Address**
   - The `from` address in the email must be from your verified domain
   - Update the `from` address in `/src/routes/api/contact/+server.ts` if needed
   - Default: `noreply@awvaughan.com`

### Option 2: Alternative Email Services

If you prefer not to use Cloudflare Email Workers, you can modify the API endpoint to use other services:

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

## Development/Testing

During development, the form will still work but emails won't be sent. The form data will be logged to the console instead. The user will still see a success message.

To test email functionality locally:
1. Set up a test email service account
2. Add environment variables
3. Update the API endpoint to use your test service

## Environment Variables

If using alternative email services, add these to your Cloudflare Pages environment variables:

- `SENDGRID_API_KEY` (for SendGrid)
- `RESEND_API_KEY` (for Resend)
- `MAILGUN_API_KEY` and `MAILGUN_DOMAIN` (for Mailgun)

## Security Considerations

1. **Rate Limiting**: Consider adding rate limiting to prevent spam
2. **CAPTCHA**: Add reCAPTCHA or similar to prevent bot submissions
3. **Input Validation**: The current implementation sanitizes inputs to prevent XSS
4. **Email Validation**: Email addresses are validated before processing

## Troubleshooting

### Emails not being sent
- Check that Email Routing is enabled in Cloudflare
- Verify the destination address is configured correctly
- Check that the `from` address is from your verified domain
- Review Cloudflare Email logs in the dashboard

### Form submissions failing
- Check browser console for errors
- Review server logs in Cloudflare Pages dashboard
- Verify the API endpoint is accessible at `/api/contact`

## Files Modified

- `/src/routes/contact/+page.svelte` - Contact form component
- `/src/routes/api/contact/+server.ts` - API endpoint for handling submissions
- `/src/lib/config/constants.ts` - Updated with social media links

## Additional Resources

- [Cloudflare Email Routing Documentation](https://developers.cloudflare.com/email-routing/)
- [Cloudflare Email Workers Documentation](https://developers.cloudflare.com/email-routing/email-workers/)
- [SvelteKit API Routes Documentation](https://kit.svelte.dev/docs/routing#server)
