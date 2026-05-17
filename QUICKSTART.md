# ⚡ Quick Start Guide

Get your Context Drop app deployed in 10 minutes!

---

## 🚀 Part 1: Push to GitHub (5 minutes)

### Step 1: Open Terminal in Project Root

```bash
cd c:/Users/ISHAN/Desktop/context_drop
```

### Step 2: Initialize Git (if needed)

```bash
git init
git add .
git commit -m "feat: Complete backend integration"
```

### Step 3: Create GitHub Repository

**Go to**: https://github.com/new

- **Name**: `context-drop`
- **Visibility**: Public or Private
- **DO NOT** check any initialization options
- Click **"Create repository"**

### Step 4: Push to GitHub

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/context-drop.git
git branch -M main
git push -u origin main
```

✅ **Done!** Your code is now on GitHub.

---

## 🚂 Part 2: Deploy to Railway (5 minutes)

### Step 1: Sign Up for Railway

**Go to**: https://railway.app

- Click **"Login"**
- Choose **"Login with GitHub"**
- Authorize Railway

### Step 2: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose **"context-drop"** repository
4. Railway will start deploying automatically

### Step 3: Configure Frontend

1. Click on the **service card** that was created
2. Go to **"Settings"** tab
3. Scroll to **"Build & Deploy"**
4. Set:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview`

### Step 4: Add Environment Variables

1. Still in Settings, go to **"Variables"** tab
2. Click **"+ New Variable"**
3. Add these one by one:

```
VITE_API_BASE_URL=https://web-production-5105.up.railway.app
VITE_API_TIMEOUT=30000
NODE_ENV=production
```

### Step 5: Redeploy

1. Go to **"Deployments"** tab
2. Click **"Deploy"** button (or it may auto-deploy)
3. Wait 2-3 minutes for build to complete

### Step 6: Get Your URL

1. Go to **"Settings"** → **"Networking"**
2. Click **"Generate Domain"**
3. Copy your URL: `https://your-app.up.railway.app`

### Step 7: Test Your App

Visit your Railway URL and test:
- ✅ Health monitor shows "Backend online"
- ✅ Ask a question in Capsule feature
- ✅ Try Ticket Analyzer
- ✅ Check Bus Factor Dashboard

---

## 🎉 You're Live!

Your app is now deployed and connected to the production backend!

**Your URLs:**
- **Frontend**: `https://your-app.up.railway.app`
- **Backend**: `https://web-production-5105.up.railway.app`
- **API Docs**: `https://web-production-5105.up.railway.app/docs`

---

## 🔄 Making Updates

After making code changes:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Railway will automatically detect the push and redeploy! 🚀

---

## 🐛 Common Issues

### Issue: Build fails
**Fix**: Check Railway logs in "Deployments" tab

### Issue: Environment variables not working
**Fix**: Make sure you clicked "Deploy" after adding variables

### Issue: API calls failing
**Fix**: Verify `VITE_API_BASE_URL` is set correctly

### Issue: 404 on page refresh
**Fix**: Add this to `frontend/public/_redirects`:
```
/*    /index.html   200
```

---

## 📚 Need More Details?

See **DEPLOYMENT.md** for comprehensive deployment guide with troubleshooting.

---

## 🆘 Quick Help

**Railway Dashboard**: https://railway.app/dashboard
**GitHub Repo**: https://github.com/YOUR_USERNAME/context-drop
**Backend Health**: https://web-production-5105.up.railway.app/health

---

**Total Time**: ~10 minutes ⚡
**Difficulty**: Easy 🟢
**Cost**: Free tier available 💰