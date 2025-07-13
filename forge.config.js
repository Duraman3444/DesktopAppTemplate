const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    name: 'Desktop App Template',
    executableName: 'desktop-app-template',
    icon: './assets/icon',
    asar: true,
    ignore: [
      /^\/src/,
      /^\/docs/,
      /^\/\.git/,
      /^\/\.vscode/,
      /^\/node_modules\/.*\.md$/,
      /^\/README\.md$/,
      /^\/\.gitignore$/,
      /^\/\.cursorrules$/,
      /^\/tsconfig\.json$/,
      /^\/vite\.config\.ts$/,
      /^\/tailwind\.config\.js$/,
      /^\/postcss\.config\.js$/,
      /^\/forge\.config\.js$/,
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'desktop-app-template',
        setupIcon: './assets/icon.ico',
        setupExe: 'desktop-app-template-setup.exe',
        certificateFile: process.env.CERTIFICATE_FILE,
        certificatePassword: process.env.CERTIFICATE_PASSWORD,
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {
        icon: './assets/icon.icns',
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Your Name',
          homepage: 'https://github.com/yourusername/desktop-app-template',
          icon: './assets/icon.png',
        },
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          maintainer: 'Your Name',
          homepage: 'https://github.com/yourusername/desktop-app-template',
          icon: './assets/icon.png',
        },
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
}; 