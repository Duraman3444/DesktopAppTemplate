import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';

export const Home: React.FC = () => {
  const { user } = useAuthStore();
  const [appVersion, setAppVersion] = useState<string>('');

  useEffect(() => {
    // Get app version from Electron
    if (window.electronAPI) {
      window.electronAPI.getVersion().then(version => {
        setAppVersion(version);
      });
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to Desktop App Template! 🚀
        </h1>
        <p className="text-gray-600 mb-4">
          This is a modern desktop application built with:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Electron for desktop capabilities</li>
          <li>React with TypeScript for UI</li>
          <li>Tailwind CSS for styling</li>
          <li>Zustand for state management</li>
          <li>React Query for server state</li>
        </ul>
        {appVersion && (
          <p className="mt-4 text-sm text-gray-500">
            App Version: {appVersion}
          </p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Authentication Status
        </h2>
        {user ? (
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-700">Signed in as {user.email}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-gray-500">Not signed in</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Desktop Features
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              if (window.electronAPI) {
                window.electronAPI.showMessageBox({
                  type: 'info',
                  title: 'Desktop Feature',
                  message: 'This is a native desktop dialog!',
                  buttons: ['OK']
                });
              }
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Show Dialog
          </button>
          <button
            onClick={() => {
              if (window.electronAPI) {
                window.electronAPI.showOpenDialog({
                  properties: ['openFile'],
                  filters: [
                    { name: 'Text Files', extensions: ['txt'] },
                    { name: 'All Files', extensions: ['*'] }
                  ]
                }).then(result => {
                  if (result && !result.canceled) {
                    window.electronAPI.showMessageBox({
                      type: 'info',
                      title: 'File Selected',
                      message: `Selected file: ${result.filePaths[0]}`,
                      buttons: ['OK']
                    });
                  }
                });
              }
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Open File
          </button>
        </div>
      </div>
    </div>
  );
}; 