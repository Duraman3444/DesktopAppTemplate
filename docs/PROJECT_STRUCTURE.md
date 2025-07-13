# 📁 Project Structure Documentation

## 🌟 Project Overview
**Framework:** Electron Desktop App with React
**Language:** TypeScript
**Version:** 1.0.0

## 📂 Directory Structure

```
DesktopAppTemplate/
├── 📁 assets/                  # Static assets (icons, images)
├── 📁 dist/                    # Built application files
├── 📁 docs/                    # Documentation files
├── 📁 src/                     # Source code
│   ├── 📁 main/                # Electron main process
│   ├── 📁 preload/             # Preload scripts
│   ├── 📁 components/          # React components
│   ├── 📁 screens/             # Application screens
│   ├── 📁 stores/              # State management
│   ├── 📁 api/                 # API clients
│   ├── 📁 types/               # TypeScript definitions
│   ├── 📁 utils/               # Utility functions
│   └── 📁 constants/           # App constants
├── 📄 package.json             # Dependencies and scripts
├── 📄 tsconfig.json            # TypeScript configuration
├── 📄 vite.config.ts           # Vite build configuration
├── 📄 forge.config.js          # Electron Forge configuration
├── 📄 tailwind.config.js       # Tailwind CSS configuration
├── 📄 postcss.config.js        # PostCSS configuration
├── 📄 index.html               # Main HTML file
├── 📄 App.tsx                  # Main React component
└── 📄 README.md                # Project documentation
```

## 🛠️ Technology Stack

### Core Technologies
- **Electron**: Cross-platform desktop application framework
- **React**: UI framework with TypeScript
- **TypeScript**: Type-safe JavaScript development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework

### State Management & Data
- **Zustand**: Lightweight state management
- **React Query**: Server state management and caching
- **Electron Store**: Persistent desktop storage

### Development Tools
- **Electron Forge**: Packaging and distribution
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing and optimization

## 📋 File Conventions

### Component Structure
```typescript
// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  return (
    <button
      onClick={onPress}
      className={`px-4 py-2 rounded-md ${
        variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
      }`}
    >
      {title}
    </button>
  );
};
```

### Screen Structure
```typescript
// src/screens/HomeScreen.tsx
import React from 'react';
import { Button } from '../components/Button';

export const HomeScreen: React.FC = () => {
  const handleButtonPress = () => {
    console.log('Button pressed!');
  };

  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Desktop App</h1>
      <Button title="Click Me" onPress={handleButtonPress} />
    </div>
  );
};
```

### Store Structure
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

## 🚀 Development Workflow

### Installation
```bash
# Install dependencies
npm install

# Install Electron dependencies
npm run postinstall
```

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Package application
npm run package

# Create distributable packages
npm run make
```

### Environment Variables
```bash
# .env file
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
NODE_ENV=development
```

## 📦 Package Management

### Installing New Dependencies
```bash
# Install runtime dependencies
npm install package-name

# Install development dependencies
npm install --save-dev package-name
```

### Desktop-specific Dependencies
- **electron**: Main framework
- **electron-forge**: Build and packaging
- **electron-store**: Persistent storage
- **electron-updater**: Auto-update functionality

## 🔧 Build Process

### Development Build
- Uses Vite for fast development server
- Hot module replacement enabled
- TypeScript compilation
- CSS processing with PostCSS

### Production Build
- Optimized bundle creation
- Asset optimization
- TypeScript compilation
- Electron packaging

## 📱 Desktop Features

### Native Integration
- File system access
- Native menus and shortcuts
- System dialogs
- Auto-updater
- Cross-platform compatibility

### IPC Communication
- Secure main-renderer communication
- Context isolation
- Preload scripts for security

## 🔍 Code Quality

### Linting Configuration
- ESLint for code quality
- TypeScript strict mode
- Prettier for formatting
- Desktop-specific best practices

### Testing Strategy
- Unit tests for business logic
- Integration tests for IPC
- E2E tests for user workflows
- Performance monitoring

## 🛡️ Security Considerations

### Electron Security
- Context isolation enabled
- Node integration disabled
- Secure IPC channels
- Content Security Policy

### Data Protection
- Secure storage practices
- Encrypted user data
- Safe file handling
- Cross-platform security

## 🚀 Deployment

### Desktop Distribution
- Windows: .exe installer
- macOS: .dmg and .app bundle
- Linux: .deb and .rpm packages

### Auto-updater
- Automatic update checks
- Background downloads
- User notification system

## 📖 Documentation

### File Documentation
- Component documentation
- API documentation
- Architecture guides
- Deployment guides

## 🔗 External Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [React Documentation](https://react.dev/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide) 