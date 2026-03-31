'use client';

import { useState, useEffect } from 'react';

function setupServiceWorker(
  setIsUpdateAvailable: (available: boolean) => void,
  setRegistration: (reg: ServiceWorkerRegistration) => void
) {
  if (!('serviceWorker' in navigator)) return;

  const onStateChange = (worker: ServiceWorker) => {
    if (worker.state === 'installed' && navigator.serviceWorker.controller) {
      setIsUpdateAvailable(true);
    }
  };

  navigator.serviceWorker.ready.then((reg) => {
    setRegistration(reg);
    reg.addEventListener('updatefound', () => {
      const worker = reg.installing;
      if (!worker) return;
      worker.addEventListener('statechange', () => onStateChange(worker));
    });
  });
}

export function usePWA() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    globalThis.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    setupServiceWorker(setIsUpdateAvailable, setRegistration);

    return () => {
      globalThis.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    
    await installPrompt.prompt();
    await installPrompt.userChoice;
    
    // Clear prompt regardless of outcome to avoid showing modal again in same session
    setInstallPrompt(null);
  };

  const dismissInstall = () => {
    setInstallPrompt(null);
  };

  const handleUpdate = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      globalThis.location.reload();
    }
  };

  return {
    canInstall: !!installPrompt,
    isUpdateAvailable,
    handleUpdate,
    handleInstall,
    dismissInstall,
  };
}
