# Turnstile Troubleshooting Guide

## Common Issues and Solutions

### ❌ Error: "Turnstile error occurred"

**Cause**: Your Turnstile widget is not authorized for the domain you're testing on (localhost).

**Solution**:

#### Method 1: Add localhost to Cloudflare Turnstile (Recommended)

1. Go to https://dash.cloudflare.com/
2. Navigate to **Turnstile** from the sidebar
3. Click on your site/widget
4. Scroll to **"Domains"** section
5. Add the following domains:
   ```
   localhost
   127.0.0.1
   ```
6. Click **Save**
7. Restart your dev server:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```
8. Refresh your browser

#### Method 2: Use Test Keys for Development

If you want to test locally without domain configuration:

**Edit `.env.local`:**
```bash
# Test Keys (always pass - for development only)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

**Your real keys are backed up in `.env.local.backup`** - use them when deploying to production!

**Restart your dev server:**
```bash
npm run dev
```

---

## Other Common Issues

### 🔴 Widget Not Appearing

**Symptoms**: The Turnstile widget doesn't load at all

**Possible Causes & Solutions**:

1. **Missing Site Key**
   - Check `.env.local` has `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - Restart dev server after changing .env files

2. **Ad Blocker**
   - Some ad blockers block Cloudflare Turnstile
   - Try disabling ad blocker temporarily
   - Add exception for `challenges.cloudflare.com`

3. **Network Issues**
   - Check browser console (F12) for network errors
   - Verify you can access: https://challenges.cloudflare.com/turnstile/v0/api.js

---

### 🟡 Submit Button Stays Disabled

**Symptoms**: Can't submit form even after filling it out

**Possible Causes & Solutions**:

1. **Turnstile Not Completed**
   - Wait 2-3 seconds for Turnstile to verify
   - Look for a checkmark in the Turnstile widget

2. **Token Not Set**
   - Open browser console (F12)
   - Type: `localStorage` and check if token exists
   - Try refreshing the page

---

### 🔴 "Die Sicherheitsüberprüfung ist fehlgeschlagen"

**Symptoms**: Form shows error message after submission

**Possible Causes & Solutions**:

1. **Wrong Secret Key**
   - Verify `TURNSTILE_SECRET_KEY` in `.env.local` is correct
   - Make sure there are no extra spaces
   - Check you copied the full key from Cloudflare dashboard

2. **Server Can't Reach Cloudflare**
   - Check your internet connection
   - Verify firewall isn't blocking outbound requests to Cloudflare
   - Check server logs for detailed error messages

---

### 🟠 Token Expired Error

**Symptoms**: "Die Sicherheitsüberprüfung ist abgelaufen"

**Solution**:
- This is normal if you wait more than 5 minutes
- Simply complete the Turnstile widget again
- Submit the form immediately after verification

---

## Debugging Tips

### Check Environment Variables

```bash
# In your terminal
cd D:\Projects\claude-cli-test

# View your .env.local (Windows)
type .env.local

# Or view it in your code editor
```

**Verify**:
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` starts with your actual key
- `TURNSTILE_SECRET_KEY` is present and correct
- No extra spaces or quotes around keys

### Check Browser Console

1. Open DevTools (F12)
2. Go to **Console** tab
3. Look for:
   - Red errors (JavaScript errors)
   - Network errors (failed to load Turnstile)
   - CORS errors

4. Go to **Network** tab
5. Filter by `turnstile`
6. Check if requests are succeeding

### Check Server Logs

In your terminal where `npm run dev` is running:
- Look for API route errors
- Check Turnstile verification responses
- Note any error messages from Cloudflare

### Test with cURL

Test the API endpoint directly:

```bash
curl -X POST http://localhost:3000/api/contact ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test\",\"email\":\"test@example.com\",\"message\":\"Test\",\"turnstileToken\":\"test-token\"}"
```

Expected error (because token is invalid):
```json
{
  "success": false,
  "error": "Die Sicherheitsüberprüfung ist fehlgeschlagen..."
}
```

---

## Quick Fixes Summary

| Issue | Quick Fix |
|-------|----------|
| Turnstile error on localhost | Add `localhost` to Cloudflare domain settings |
| Widget not loading | Check ad blocker, check browser console |
| Form won't submit | Wait for Turnstile to complete (2-3 sec) |
| Server error | Verify secret key in `.env.local` |
| Token expired | Complete Turnstile again, submit immediately |

---

## Still Having Issues?

### Step-by-Step Debug Process

1. **Verify Keys Are Correct**
   ```bash
   # Check your .env.local file
   type .env.local
   ```

2. **Restart Everything**
   ```bash
   # Stop dev server (Ctrl+C)
   # Start again
   npm run dev
   ```

3. **Clear Browser Cache**
   - Press Ctrl+Shift+Delete
   - Clear cached images and files
   - Or use Incognito mode

4. **Check Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com/
   - Click Turnstile → Your Site
   - Check "Analytics" for verification attempts
   - Look for failed verifications

5. **Use Test Keys Temporarily**
   - Switch to test keys in `.env.local`
   - If test keys work, issue is with your real keys/domain config
   - If test keys don't work, issue is with the code

---

## Production Deployment Checklist

Before deploying to production:

- [ ] Add your production domain to Cloudflare Turnstile
- [ ] Use your real keys (not test keys)
- [ ] Set environment variables in hosting platform
- [ ] Test on staging environment first
- [ ] Verify HTTPS is enabled
- [ ] Check Cloudflare analytics dashboard

---

## Contact Support

If you've tried everything:

1. Check Cloudflare Turnstile status: https://www.cloudflarestatus.com/
2. Review Cloudflare Turnstile documentation: https://developers.cloudflare.com/turnstile/
3. Check your Cloudflare dashboard for error messages

---

## Useful Resources

- [Cloudflare Turnstile Docs](https://developers.cloudflare.com/turnstile/)
- [Turnstile Dashboard](https://dash.cloudflare.com/?to=/:account/turnstile)
- [React Turnstile GitHub](https://github.com/marsidev/react-turnstile)
- [Common Error Codes](https://developers.cloudflare.com/turnstile/troubleshooting/error-codes/)
