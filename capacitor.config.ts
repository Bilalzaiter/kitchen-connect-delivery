import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.46a400a588bd425cb6a786b641223073',
  appName: 'kitchen-connect-delivery',
  webDir: 'dist',
  server: {
    url: 'https://46a400a5-88bd-425c-b6a7-86b641223073.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;
