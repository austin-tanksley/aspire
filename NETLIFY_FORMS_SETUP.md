# Netlify Forms Setup Guide

This guide explains how to set up and configure Netlify Forms with your Astro project.

## What We've Set Up

1. **Form Configuration**: Your quote form is now configured to work with Netlify Forms
2. **Success Page**: A dedicated success page for form submissions
3. **Spam Protection**: Honeypot field to prevent spam submissions
4. **Form Detection**: Hidden form file for Netlify to detect during build

## Key Features

### Form Attributes
- `data-netlify="true"`: Tells Netlify this is a form to handle
- `method="POST"`: Standard form submission method
- `netlify-honeypot="bot-field"`: Spam protection

### Hidden Fields
- `form-name`: Required for Netlify to identify the form
- `bot-field`: Honeypot field for spam protection

## Deployment Steps

### 1. Deploy to Netlify
1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### 2. Configure Form Settings (Optional)
In your Netlify dashboard:
1. Go to **Forms** section
2. Find your `quote-form`
3. Configure notifications (email, Slack, etc.)
4. Set up spam filtering

### 3. Test the Form
1. Deploy your site
2. Fill out and submit the form
3. Check Netlify dashboard for submissions
4. Verify redirect to success page

## Form Submission Flow

1. User fills out form
2. JavaScript validates form data
3. Form submits to Netlify via AJAX
4. User is redirected to `/success` page
5. Form data appears in Netlify dashboard

## Customization Options

### Email Notifications
Add to `netlify.toml`:
```toml
[[redirects]]
  from = "/"
  to = "/success"
  status = 302
  conditions = {Form = ["quote-form"]}

[forms]
  [forms.quote-form]
    [forms.quote-form.notifications]
      [forms.quote-form.notifications.email]
        to = ["your-email@example.com"]
        subject = "New Quote Request"
```

### Custom Success Page
The form redirects to `/success` after submission. You can customize this page or change the redirect URL.

### Form Validation
The form includes client-side validation for:
- Required fields
- Email format
- Phone number format
- ZIP code format

## Troubleshooting

### Form Not Appearing in Netlify Dashboard
1. Ensure `data-netlify="true"` is present
2. Check that the hidden `form.html` file is being built
3. Verify the form name matches exactly

### Form Submissions Not Working
1. Check browser console for JavaScript errors
2. Verify form field names match the hidden form
3. Ensure all required fields are filled

### Spam Submissions
1. The honeypot field should catch most bots
2. Consider adding reCAPTCHA for additional protection
3. Monitor form submissions in Netlify dashboard

## Advanced Features

### File Uploads
To add file uploads, add `enctype="multipart/form-data"` to your form and configure file upload limits in Netlify.

### Custom Form Actions
You can specify a custom action URL by adding `action="/custom-endpoint"` to your form.

### Form Analytics
Netlify provides built-in analytics for form submissions in the dashboard.

## Security Best Practices

1. **Honeypot Fields**: Already implemented
2. **Input Validation**: Client and server-side validation
3. **HTTPS**: Netlify provides SSL certificates
4. **Rate Limiting**: Consider implementing if needed

## Support

For more information, visit:
- [Netlify Forms Documentation](https://docs.netlify.com/forms/setup/)
- [Astro Netlify Adapter](https://docs.astro.build/en/guides/deploy/netlify/) 