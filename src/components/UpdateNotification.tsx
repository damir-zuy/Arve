import { useEffect, useState } from 'react'

export function UpdateNotification() {
  const [showUpdateAvailable, setShowUpdateAvailable] = useState(false)
  const [showUpdateReady, setShowUpdateReady] = useState(false)

  useEffect(() => {
    // Listen for update events
    window.electronAPI.onUpdateAvailable(() => {
      setShowUpdateAvailable(true)
    })

    window.electronAPI.onUpdateDownloaded(() => {
      setShowUpdateAvailable(false)
      setShowUpdateReady(true)
    })
  }, [])

  const installUpdate = () => {
    window.electronAPI.restartApp()
  }

  if (!showUpdateAvailable && !showUpdateReady) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      background: '#333',
      color: 'white',
      padding: '10px 20px',
      borderRadius: 8,
      zIndex: 1000
    }}>
      {showUpdateAvailable && <p>A new update is downloading...</p>}
      {showUpdateReady && (
        <div>
          <p>Update ready to install!</p>
          <button onClick={installUpdate}>
            Restart to Install
          </button>
        </div>
      )}
    </div>
  )
}
