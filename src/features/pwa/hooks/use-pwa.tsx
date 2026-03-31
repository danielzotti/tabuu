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

const INSTALL_SNOOZE_KEY = 'pwa_install_snooze';
const UPDATE_SNOOZE_KEY = 'pwa_update_snooze';
const SNOOZE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 week

function isSnoozed(key: string) {
  if (globalThis.window === undefined) return false;
  const lastSnooze = localStorage.getItem(key);
  if (!lastSnooze) return false;
  return Date.now() - Number.parseInt(lastSnooze) < SNOOZE_DURATION;
}

export function usePWA() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isUpdateAvailableInternal, setIsUpdateAvailableInternal] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [isInstallSnoozed, setIsInstallSnoozed] = useState(false);
  const [isUpdateSnoozed, setIsUpdateSnoozed] = useState(false);

  useEffect(() => {
    setIsInstallSnoozed(isSnoozed(INSTALL_SNOOZE_KEY));
    setIsUpdateSnoozed(isSnoozed(UPDATE_SNOOZE_KEY));

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    globalThis.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    setupServiceWorker(setIsUpdateAvailableInternal, setRegistration);

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
    localStorage.setItem(INSTALL_SNOOZE_KEY, Date.now().toString());
    setIsInstallSnoozed(true);
  };

  const handleUpdate = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      globalThis.location.reload();
    }
  };

  const dismissUpdate = () => {
    setIsUpdateSnoozed(true);
    localStorage.setItem(UPDATE_SNOOZE_KEY, Date.now().toString());
  };

  return {
    canInstall: !!installPrompt && !isInstallSnoozed,
    isUpdateAvailable: isUpdateAvailableInternal && !isUpdateSnoozed,
    handleUpdate,
    dismissUpdate,
    handleInstall,
    dismissInstall,
  };
};
