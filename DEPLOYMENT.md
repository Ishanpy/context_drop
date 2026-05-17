# 🚀 Deployment Guide

Complete step-by-step guide for deploying Context Drop to GitHub and Railway.

---

## 📋 Table of Contents

1. [Git & GitHub Setup](#git--github-setup)
2. [Railway Deployment](#railway-deployment)
3. [Environment Variables](#environment-variables)
4. [Post-Deployment](#post-deployment)
5. [Troubleshooting](#troubleshooting)

---

## 🔧 Git & GitHub Setup

### Step 1: Initialize Git Repository (if not already done)

```bash
# Navigate to project root
cd c:/Users/ISHAN/Desktop/context_drop

# Check if git is initialized
git status

# If not initialized, run:
git init
```

### Step 2: Create .gitignore (if not exists)

Create a `.gitignore` file in the root directory:

```bash
# Create .gitignore
touch .gitignore
```

Add the following content to `.gitignore`:

```
# Dependencies
node_modules/
frontend/node_modules/
backend/__pycache__/
backend/*.pyc
backend/.pytest_cache/

# Environment variables
.env
.env.local
.env.production
frontend/.env.production
backend/.env

# Build outputs
frontend/dist/
frontend/build/
*.log

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Python
*.pyc
__pycache__/
*.egg-info/
.pytest_cache/

# Misc
.cache/
coverage/
```

### Step 3: Stage All Changes

```bash
# Add all files to staging
git add .

# Check what will be committed
git status
```

### Step 4: Commit Changes

```bash
# Commit with descriptive message
git commit -m "feat: Complete backend integration with production API

- Add production-grade API client with retry logic
- Implement all 6 API endpoints (Capsule, Ticket, Bus Factor, Departure Brief, PR Brief, Ingest)
- Add comprehensive error handling system
- Create form validation utilities
- Implement health monitoring
- Add new feature components (TicketAnalyzer, BusFactorDashboard, etc.)
- Update DashboardPage with all integrations
- Preserve existing UI/UX exactly as-is
- Add complete integration documentation"
```

### Step 5: Create GitHub Repository

**Option A: Via GitHub Website**

1. Go to https://github.com
2. Click the **"+"** icon in top-right corner
3. Select **"New repository"**
4. Fill in details:
   - **Repository name**: `context-drop` (or your preferred name)
   - **Description**: "AI-powered repository intelligence platform with full backend integration"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

**Option B: Via GitHub CLI (if installed)**

```bash
# Install GitHub CLI if not installed
# Windows: winget install GitHub.cli
# Mac: brew install gh

# Login to GitHub
gh auth login

# Create repository
gh repo create context-drop --public --source=. --remote=origin
```

### Step 6: Connect Local Repository to GitHub

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/context-drop.git

# Verify remote was added
git remote -v

# Push to GitHub
git push -u origin main

# If your default branch is 'master', use:
# git push -u origin master
```

### Step 7: Verify Upload

1. Go to your GitHub repository URL
2. Verify all files are uploaded
3. Check that `.env` files are NOT uploaded (they should be in .gitignore)

---

## 🚂 Railway Deployment

### Prerequisites

- GitHub account with repository created (from above steps)
- Railway account (sign up at https://railway.app)
- Credit card for Railway (free tier available, but card required)

### Step 1: Sign Up / Login to Railway

1. Go to https://railway.app
2. Click **"Login"** or **"Start a New Project"**
3. Sign in with GitHub (recommended) or email
4. Authorize Railway to access your GitHub repositories

### Step 2: Create New Project

1. Click **"New Project"** button
2. Select **"Deploy from GitHub repo"**
3. Choose your repository: `context-drop`
4. Railway will detect your project structure

### Step 3: Configure Frontend Service

Railway should auto-detect the frontend. If not:

1. Click **"Add Service"**
2. Select **"GitHub Repo"**
3. Choose `context-drop` repository
4. Railway will create a service

### Step 4: Configure Build Settings

1. Click on the **frontend service** card
2. Go to **"Settings"** tab
3. Configure the following:

**Build Settings:**
```
Root Directory: frontend
Build Command: npm install && npm run build
Start Command: npm run preview
```

**Or if using a static server:**
```
Root Directory: frontend
Build Command: npm install && npm run build
Start Command: npx serve -s dist -l $PORT
```

### Step 5: Add Environment Variables

1. In the service settings, go to **"Variables"** tab
2. Click **"+ New Variable"**
3. Add the following variables:

```
VITE_API_BASE_URL=https://web-production-5105.up.railway.app
VITE_API_TIMEOUT=30000
NODE_ENV=production
```

**Important**: Make sure `VITE_API_BASE_URL` points to your backend URL.

### Step 6: Configure Port (if needed)

1. In **"Settings"** → **"Networking"**
2. Railway will auto-assign a port
3. Make sure your app listens on `process.env.PORT` or Railway's assigned port

### Step 7: Deploy

1. Click **"Deploy"** button
2. Railway will:
   - Clone your repository
   - Install dependencies
   - Build the project
   - Deploy to production
3. Monitor the **"Deployments"** tab for progress

### Step 8: Get Your Deployment URL

1. Once deployed, go to **"Settings"** → **"Networking"**
2. Click **"Generate Domain"**
3. Railway will provide a URL like: `your-app.up.railway.app`
4. Copy this URL

### Step 9: Update Backend CORS (if needed)

If your backend needs to whitelist the frontend URL:

1. Go to your backend service on Railway
2. Add environment variable:
   ```
   FRONTEND_URL=https://your-app.up.railway.app
   ```
3. Update backend CORS settings to allow this origin

### Step 10: Test Deployment

1. Visit your Railway URL: `https://your-app.up.railway.app`
2. Test all features:
   - ✅ Capsule feature
   - ✅ Ticket analyzer
   - ✅ Bus factor dashboard
   - ✅ Health monitor shows "Backend online"
3. Check browser console for errors
4. Verify API calls are successful

---

## 🔐 Environment Variables

### Development (.env.development)

```env
VITE_API_BASE_URL=https://web-production-5105.up.railway.app
VITE_API_TIMEOUT=30000
```

### Production (Railway Variables)

Set these in Railway dashboard:

```env
VITE_API_BASE_URL=https://web-production-5105.up.railway.app
VITE_API_TIMEOUT=30000
NODE_ENV=production
```

### Important Notes:

- **DO NOT** commit `.env` files to GitHub
- Use Railway's environment variables for production
- Vite requires `VITE_` prefix for environment variables
- Variables are embedded at build time, not runtime

---

## 📦 Alternative Deployment Options

### Option 1: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel

# Follow prompts
# Set environment variables in Vercel dashboard
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Navigate to frontend
cd frontend

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist

# Set environment variables in Netlify dashboard
```

### Option 3: GitHub Pages (Static Only)

```bash
# Add to package.json
"homepage": "https://YOUR_USERNAME.github.io/context-drop"

# Install gh-pages
npm install --save-dev gh-pages

# Add deploy script to package.json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Deploy
npm run deploy
```

---

## 🔄 Continuous Deployment

### Automatic Deployments on Railway

Railway automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "feat: Add new feature"
git push origin main

# Railway will automatically:
# 1. Detect the push
# 2. Pull latest code
# 3. Rebuild
# 4. Deploy
```

### Manual Deployment Trigger

1. Go to Railway dashboard
2. Click on your service
3. Go to **"Deployments"** tab
4. Click **"Deploy"** button

---

## 🐛 Troubleshooting

### Issue: Build Fails on Railway

**Solution:**
1. Check **"Deployments"** → **"View Logs"**
2. Common issues:
   - Missing dependencies: Run `npm install` locally first
   - Build errors: Test `npm run build` locally
   - Wrong Node version: Add `.nvmrc` file with Node version

```bash
# Create .nvmrc
echo "18" > .nvmrc
```

### Issue: Environment Variables Not Working

**Solution:**
1. Ensure variables have `VITE_` prefix
2. Rebuild after adding variables (Railway doesn't auto-rebuild)
3. Check variables are set in Railway dashboard
4. Verify with: `console.log(import.meta.env.VITE_API_BASE_URL)`

### Issue: API Calls Failing

**Solution:**
1. Check backend is running: `curl https://web-production-5105.up.railway.app/health`
2. Verify CORS is enabled on backend
3. Check browser console for CORS errors
4. Ensure `VITE_API_BASE_URL` is correct

### Issue: 404 on Refresh

**Solution:**
Add `_redirects` file in `frontend/public/`:

```
/*    /index.html   200
```

Or configure Railway to serve SPA:

```bash
# In package.json start command
"start": "npx serve -s dist -l $PORT --single"
```

### Issue: Git Push Rejected

**Solution:**
```bash
# Pull latest changes first
git pull origin main --rebase

# Then push
git push origin main
```

### Issue: Large Files

**Solution:**
```bash
# Use Git LFS for large files
git lfs install
git lfs track "*.psd"
git add .gitattributes
git commit -m "Add Git LFS"
```

---

## 📊 Monitoring & Logs

### Railway Logs

1. Go to Railway dashboard
2. Click on your service
3. Go to **"Deployments"** tab
4. Click on latest deployment
5. View **"Build Logs"** and **"Deploy Logs"**

### Health Monitoring

Your app includes a health monitor component that checks backend status every 30 seconds.

### Performance Monitoring

Consider adding:
- **Sentry** for error tracking
- **Google Analytics** for usage analytics
- **LogRocket** for session replay

---

## 🎉 Success Checklist

After deployment, verify:

- [ ] Frontend is accessible at Railway URL
- [ ] Health monitor shows "Backend online"
- [ ] Capsule feature works (submit a question)
- [ ] Ticket analyzer works
- [ ] Bus factor dashboard loads
- [ ] All API calls succeed
- [ ] No console errors
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Environment variables set correctly

---

## 📚 Additional Resources

- **Railway Docs**: https://docs.railway.app
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html
- **GitHub Docs**: https://docs.github.com
- **Git Basics**: https://git-scm.com/book/en/v2

---

## 🆘 Need Help?

If you encounter issues:

1. Check Railway deployment logs
2. Review browser console errors
3. Verify environment variables
4. Test backend health endpoint
5. Check CORS configuration
6. Review INTEGRATION.md for API details

---

## 🎊 Congratulations!

Your Context Drop application is now deployed and connected to the production backend! 🚀

**Your URLs:**
- Frontend: `https://your-app.up.railway.app`
- Backend: `https://web-production-5105.up.railway.app`
- API Docs: `https://web-production-5105.up.railway.app/docs`