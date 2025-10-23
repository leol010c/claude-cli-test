# Cloudflare Turnstile Integration - Setup Guide

This project includes complete Cloudflare Turnstile integration for bot protection on the contact form.

## What is Cloudflare Turnstile?

Cloudflare Turnstile is a user-friendly alternative to traditional CAPTCHAs. It provides bot protection without frustrating legitimate users with image puzzles or challenges.

## Features Implemented

✅ **Frontend Widget** - Turnstile widget integrated into contact form
✅ **Server-Side Validation** - API route verifies tokens with Cloudflare
✅ **German Error Messages** - User-friendly German error messages
✅ **Environment Variables** - Secure configuration with .env files
✅ **Token Management** - Automatic token expiration handling
✅ **Form Validation** - Submit button disabled until verification passes

## Quick Start

### 1. Get Your Turnstile Keys

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select **"Turnstile"** from the sidebar
3. Click **"Add site"** or **"Add widget"**
4. Configure your site:
   - **Site name**: Kieferorthopädie Website
   - **Domain**: Your domain (or use `localhost` for development)
   - **Widget Mode**: Managed (recommended)
5. Click **"Create"**
6. Copy your **Site Key** and **Secret Key**

### 2. Configure Environment Variables

The project already has a `.env.local` file with test keys. For production, update it with your real keys:

```bash
# Edit .env.local
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-actual-site-key-here
TURNSTILE_SECRET_KEY=your-actual-secret-key-here
```

**Important Notes:**
- `.env.local` is already in `.gitignore` - your keys won't be committed
- `NEXT_PUBLIC_*` variables are exposed to the browser (site key only)
- `TURNSTILE_SECRET_KEY` stays server-side only (never exposed)

### 3. Test Keys (Development)

For testing during development, you can use Cloudflare's dummy keys:

```bash
# Always passes
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA

# Always fails
NEXT_PUBLIC_TURNSTILE_SITE_KEY=2x00000000000000000000AB
TURNSTILE_SECRET_KEY=2x0000000000000000000000000000000AA

# Forces interactive challenge
NEXT_PUBLIC_TURNSTILE_SITE_KEY=3x00000000000000000000FF
TURNSTILE_SECRET_KEY=3x0000000000000000000000000000000AA
```

### 4. Run the Project

```bash
npm run dev
```

Visit http://localhost:3000/kontakt to test the contact form with Turnstile.

## How It Works

### Frontend Flow

1. User fills out the contact form (Name, E-Mail, Nachricht)
2. Turnstile widget loads automatically
3. User completes Turnstile challenge (usually automatic)
4. Token is generated and stored in state
5. Submit button becomes enabled
6. Form submits with token to API route

### Backend Flow

1. API receives form data + Turnstile token
2. Server validates token with Cloudflare API
3. If valid: Process form submission
4. If invalid: Return German error message
5. Response sent back to frontend

### Error Handling

The integration handles multiple error scenarios:

- **No token**: "Bitte bestätigen Sie, dass Sie kein Roboter sind."
- **Verification failed**: "Die Sicherheitsüberprüfung ist fehlgeschlagen. Bitte versuchen Sie es erneut."
- **Token expired**: "Die Sicherheitsüberprüfung ist abgelaufen. Bitte bestätigen Sie erneut."
- **Server error**: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."

## File Structure

```
app/
├── api/
│   └── contact/
│       └── route.ts              # API route with Turnstile verification
├── kontakt/
│   └── page.tsx                  # Contact page with form
components/
└── turnstile-widget.tsx          # Reusable Turnstile component
.env.local                         # Your secret keys (not in git)
.env.example                       # Template for environment variables
```

## API Endpoint

**Endpoint**: `POST /api/contact`

**Request Body**:
```json
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "message": "Ihre Nachricht hier",
  "turnstileToken": "0.ABC..."
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen."
}
```

**Error Response** (400/500):
```json
{
  "success": false,
  "error": "Die Sicherheitsüberprüfung ist fehlgeschlagen. Bitte versuchen Sie es erneut."
}
```

## Customization

### Change Widget Appearance

Edit `components/turnstile-widget.tsx`:

```typescript
options={{
  theme: "light",  // or "dark", "auto"
  size: "normal",  // or "compact"
}}
```

### Add Form Processing

Edit `app/api/contact/route.ts` to add your own logic:

```typescript
// After Turnstile verification succeeds:

// 1. Save to database
await db.contacts.create({...})

// 2. Send email notification
await sendEmail({...})

// 3. Integrate with CRM
await crm.createLead({...})
```

## Security Best Practices

✅ **Never expose secret key** - Only use in server-side code
✅ **Validate on server** - Always verify tokens server-side
✅ **Use HTTPS in production** - Required for Turnstile
✅ **Keep keys in .env.local** - Never commit to git
✅ **Rotate keys regularly** - Generate new keys periodically

## Troubleshooting

### Widget doesn't appear
- Check browser console for errors
- Verify `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set
- Ensure you're not blocking Cloudflare domains

### Verification always fails
- Check `TURNSTILE_SECRET_KEY` is correct
- Verify server can reach `challenges.cloudflare.com`
- Check API logs for detailed error codes

### Submit button stays disabled
- Open browser DevTools → Console
- Check if Turnstile token is being set
- Try refreshing the page

## Production Deployment

Before deploying to production:

1. ✅ Replace test keys with real Cloudflare keys
2. ✅ Add your production domain to Turnstile site settings
3. ✅ Set environment variables in your hosting platform:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment
   - Other: Follow platform documentation
4. ✅ Test thoroughly on staging environment
5. ✅ Enable HTTPS (required for Turnstile)

## Resources

- [Cloudflare Turnstile Documentation](https://developers.cloudflare.com/turnstile/)
- [Turnstile Dashboard](https://dash.cloudflare.com/?to=/:account/turnstile)
- [React Turnstile Package](https://github.com/marsidev/react-turnstile)

## Support

For issues with this integration, check:
1. Browser console for frontend errors
2. Server logs for backend errors
3. Cloudflare Turnstile dashboard for analytics

---

**Note**: The current `.env.local` file contains Cloudflare's test keys that always pass verification. Replace them with your real keys for production use.
