import { useEffect, useState } from 'react';

export function UpdateNotification() {
  const [showUpdateAvailable, setShowUpdateAvailable] = useState(false);
  const [showUpdateReady, setShowUpdateReady] = useState(false);

  useEffect(() => {
    const handleUpdateAvailable = () => setShowUpdateAvailable(true);
    const handleUpdateDownloaded = () => {
      setShowUpdateAvailable(false);
      setShowUpdateReady(true);
    };

    window.electronAPI.onUpdateAvailable(handleUpdateAvailable);
    window.electronAPI.onUpdateDownloaded(handleUpdateDownloaded);

    // If your preload exposes "off" methods, you can clean up like this:
    return () => {
      // Example if available:
      // window.electronAPI.offUpdateAvailable(handleUpdateAvailable);
      // window.electronAPI.offUpdateDownloaded(handleUpdateDownloaded);
    };
  }, []);

  const installUpdate = () => {
    window.electronAPI.restartApp();
  };

  if (!showUpdateAvailable && !showUpdateReady) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        background: '#333',
        color: 'white',
        padding: '10px 20px',
        borderRadius: 8,
        zIndex: 1000,
        transition: 'opacity 0.3s ease-in-out',
        opacity: showUpdateAvailable || showUpdateReady ? 1 : 0
      }}
    >
      {showUpdateAvailable && <p>A new update is downloading...</p>}
      {showUpdateReady && (
        <div>
          <p>Update ready to install!</p>
          <button
            onClick={installUpdate}
            style={{
              marginTop: 10,
              padding: '6px 12px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Restart to Install
          </button>
        </div>
      )}
    </div>
  );
}
