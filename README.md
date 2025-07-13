# Desktop App Template

A modern desktop application template built with Electron, React, TypeScript, and Tailwind CSS.

## Features

- **Electron** - Cross-platform desktop application framework
- **React** - Modern UI framework with functional components and hooks
- **TypeScript** - Type-safe JavaScript for better development experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Zustand** - Lightweight state management
- **React Query** - Server state management and caching
- **Vite** - Fast build tool and development server
- **Electron Forge** - Complete tool for packaging and distributing Electron apps

## Desktop Features

- Native desktop menus and keyboard shortcuts
- File system access with secure IPC communication
- System dialogs (open, save, message boxes)
- Auto-updater support
- Persistent storage with electron-store
- Cross-platform support (Windows, macOS, Linux)

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Package the app**
   ```bash
   npm run package
   ```

6. **Create distributable packages**
   ```bash
   npm run make
   ```

## Project Structure

```
src/
├── main/           # Electron main process
├── preload/        # Preload scripts for secure IPC
├── components/     # React components
├── screens/        # Application screens/pages
├── stores/         # Zustand state stores
├── api/            # API clients and services
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Development

- **Main Process**: `src/main/main.ts` - Electron main process
- **Preload Script**: `src/preload/preload.ts` - Secure bridge between main and renderer
- **Renderer Process**: `src/index.tsx` - React application entry point
- **App Component**: `App.tsx` - Main React component with routing

## Security

The app follows Electron security best practices:
- Context isolation enabled
- Node integration disabled in renderer
- Secure IPC communication through preload scripts
- Content Security Policy (CSP) ready

## Building and Distribution

The app uses Electron Forge for packaging and distribution:
- **Windows**: Creates `.exe` installer with Squirrel
- **macOS**: Creates `.dmg` and `.app` bundle
- **Linux**: Creates `.deb` and `.rpm` packages

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly on all target platforms
4. Submit a pull request

## License

MIT License - see LICENSE file for details. 