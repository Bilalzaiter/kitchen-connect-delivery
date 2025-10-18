# Native Mobile App Setup with Capacitor

Your KitchenConnect app is now configured for native mobile deployment! 🎉

## What's Been Set Up

✅ Capacitor core dependencies installed
✅ iOS and Android platform packages added
✅ Configuration file (`capacitor.config.ts`) created
✅ Hot-reload enabled for development

## Development with Hot Reload

Your Capacitor app is configured to connect to the Lovable sandbox, which means you can see changes in real-time on your mobile device while editing in Lovable!

## Deploying to Physical Devices or Emulators

To run your app on actual devices or emulators, follow these steps:

### Prerequisites

- **For iOS**: macOS with Xcode installed
- **For Android**: Android Studio installed
- Git installed on your machine
- Node.js and npm installed

### Step-by-Step Deployment

#### 1. Export to GitHub
Click the "Export to GitHub" button in Lovable to transfer your project to your own GitHub repository.

#### 2. Clone and Setup
```bash
# Clone your repository
git clone <your-repo-url>
cd kitchen-connect-delivery

# Install dependencies
npm install
```

#### 3. Add Native Platforms

**For Android:**
```bash
npx cap add android
npx cap update android
```

**For iOS:**
```bash
npx cap add ios
npx cap update ios
```

#### 4. Build Your Web Assets
```bash
npm run build
```

#### 5. Sync with Native Platforms
Every time you pull new changes from GitHub, run:
```bash
npx cap sync
```

#### 6. Run on Device/Emulator

**For Android:**
```bash
npx cap run android
```

**For iOS (macOS only):**
```bash
npx cap run ios
```

## Future Updates

After making changes in Lovable:

1. Export/push to your GitHub repository
2. Pull the changes locally: `git pull`
3. Build: `npm run build`
4. Sync: `npx cap sync`
5. Run: `npx cap run android` or `npx cap run ios`

## Configuration Details

- **App ID**: `app.lovable.46a400a588bd425cb6a786b641223073`
- **App Name**: kitchen-connect-delivery
- **Hot Reload URL**: Configured to connect to Lovable sandbox during development

## Need Help?

Check out the [Capacitor Documentation](https://capacitorjs.com/docs) for more detailed information about native features and deployment options.

---

**Note**: The hot-reload configuration is perfect for development. When you're ready to deploy to production (App Store/Play Store), you'll want to update the `capacitor.config.ts` to remove the `server.url` configuration so the app uses locally bundled assets instead.
