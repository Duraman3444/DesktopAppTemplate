# Project Structure Documentation

## 📱 MyReactNativeApp

**Version:** 1.0.0
**Last Updated:** 2025-07-12
**Framework:** React Native with Expo  
**Language:** TypeScript  

---

## 🏗️ Directory Structure

```
MyReactNativeApp/
├── 📁 src/                     # Source code directory
│   ├── 📁 api/                 # API calls and Supabase integration
│   │   └── supabase.ts         # Supabase client configuration
│   ├── 📁 components/          # Reusable UI components
│   ├── 📁 screens/             # Screen components
│   ├── 📁 stores/              # Zustand state management
│   │   └── authStore.ts        # Authentication state store
│   ├── 📁 utils/               # Utility functions and helpers
│   ├── 📁 types/               # TypeScript type definitions
│   │   └── nativewind.d.ts     # NativeWind TypeScript support
│   └── 📁 constants/           # App constants and configuration
├── 📁 assets/                  # Static assets (images, fonts, etc.)
├── 📁 docs/                    # Project documentation
├── 📁 ios/                     # iOS native code and configuration
├── 📁 .expo/                   # Expo configuration and cache
├── 📄 App.tsx                  # Main application entry point
├── 📄 package.json             # Dependencies and scripts
├── 📄 app.json                 # Expo app configuration
├── 📄 metro.config.js          # Metro bundler configuration
├── 📄 tailwind.config.js       # Tailwind CSS configuration
├── 📄 global.css               # Global NativeWind styles
├── 📄 tsconfig.json            # TypeScript configuration
├── 📄 .cursorrules             # AI development assistance rules
├── 📄 env.example              # Environment variables template
└── 📄 nativewind-env.d.ts      # NativeWind environment types
```

---

## 🔧 Technology Stack

### **Core Technologies**
- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and toolchain
- **TypeScript**: Static type checking

### **Styling**
- **NativeWind**: Tailwind CSS for React Native
- **Tailwind CSS**: Utility-first CSS framework

### **State Management**
- **Zustand**: Lightweight state management
- **React Query**: Server state management

### **Backend & Database**
- **Supabase**: Backend-as-a-Service
  - Authentication
  - PostgreSQL database
  - Real-time subscriptions

### **Navigation**
- **React Navigation**: Navigation library for React Native

### **Development Tools**
- **Metro**: JavaScript bundler
- **ESLint**: Code linting
- **Prettier**: Code formatting

---

## 📋 File Conventions

### **Component Structure**
```typescript
// src/components/Button/Button.tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  return (
    <TouchableOpacity 
      className={`p-4 rounded-lg ${variant === 'primary' ? 'bg-blue-500' : 'bg-gray-300'}`}
      onPress={onPress}
    >
      <Text className={`text-center font-medium ${variant === 'primary' ? 'text-white' : 'text-gray-700'}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
```

### **Screen Structure**
```typescript
// src/screens/HomeScreen/HomeScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useAuthStore } from '../stores/authStore';

export const HomeScreen: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl font-bold">Welcome, {user?.email}!</Text>
    </View>
  );
};
```

### **Store Structure**
```typescript
// src/stores/exampleStore.ts
import { create } from 'zustand';

interface ExampleState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useExampleStore = create<ExampleState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18+)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### **Installation**
```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS Simulator
npx expo start --ios

# Run on Android Emulator
npx expo start --android
```

### **Environment Setup**
1. Copy `env.example` to `.env`
2. Fill in your Supabase credentials:
   ```bash
   EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

---

## 📦 Package Management

### **Adding Dependencies**
```bash
# React Native compatible package
npx expo install package-name

# Standard npm package
npm install package-name

# Development dependency
npm install --save-dev package-name
```

### **Key Dependencies**
- `@react-navigation/native` - Navigation
- `@supabase/supabase-js` - Backend integration
- `zustand` - State management
- `@tanstack/react-query` - Server state
- `nativewind` - Styling
- `react-native-safe-area-context` - Safe area handling

---

## 🔄 Development Workflow

### **Branch Strategy**
- `main` - Production ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches

### **Coding Standards**
- Use TypeScript for all files
- Follow React Native best practices
- Use functional components with hooks
- Implement proper error handling
- Write clean, self-documenting code

### **Performance Guidelines**
- Optimize images and assets
- Use React.memo for expensive components
- Implement lazy loading where appropriate
- Monitor bundle size
- Profile performance regularly

---

## 🧪 Testing Strategy

### **Testing Tools** (To be implemented)
- Jest - Unit testing
- React Native Testing Library - Component testing
- Detox - E2E testing

### **Testing Structure**
```
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       └── Button.test.tsx
└── screens/
    └── HomeScreen/
        ├── HomeScreen.tsx
        └── HomeScreen.test.tsx
```

---

## 📱 Platform Considerations

### **iOS Specific**
- Handle safe areas properly
- Test on multiple device sizes
- Consider iOS design guidelines

### **Android Specific**
- Handle navigation gestures
- Test on different Android versions
- Consider Material Design principles

---

## 🔐 Security Best Practices

- Never commit sensitive data
- Use environment variables for secrets
- Implement proper authentication
- Validate user inputs
- Use HTTPS for all API calls
- Follow OWASP mobile security guidelines

---

## 📊 Monitoring & Analytics

### **Performance Monitoring**
- React Native Performance Monitor
- Flipper integration
- Custom performance metrics

### **Error Tracking** (To be implemented)
- Sentry for error tracking
- Custom error boundaries
- Logging system integration

---

## 🚢 Deployment

### **Build Process**
```bash
# Development build
npx expo start

# Production build
eas build --platform all

# Submit to app stores
eas submit --platform all
```

### **Environment Configuration**
- Development: Local development
- Staging: Pre-production testing
- Production: Live app store versions

---

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/docs)
- [Expo Documentation](https://docs.expo.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

---

**Last Updated:** 2025-07-12
**Maintainer:** Development Team  
**Next Review:** ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()} 