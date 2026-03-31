'use client';

import { usePWA } from '../hooks/use-pwa';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import Image from 'next/image';

export function PWAManager() {
  const { canInstall, isUpdateAvailable, handleInstall, handleUpdate, dismissInstall } = usePWA();

  return (
    <>
      {/* Install Prompt */}
      <Dialog open={canInstall} onOpenChange={(open) => !open && dismissInstall()}>
        <DialogContent className="sm:max-w-md border-fuchsia-500/20 bg-zinc-950/95 backdrop-blur-xl">
          <DialogHeader className="flex flex-col items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl shadow-2xl shadow-fuchsia-500/20">
              <Image
                src="/icon-512x512.png"
                alt="Tabuu Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-1 text-center">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
                Installa Tabuu
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                Aggiungi Tabuu alla tua home per un'esperienza a tutto schermo e offline.
              </DialogDescription>
            </div>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 pt-4 sm:justify-between">
            <Button
              variant="outline"
              onClick={dismissInstall}
              className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 shadow-sm"
            >
              Non ora
            </Button>
            <Button
              onClick={handleInstall}
              className="bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white border-0 shadow-lg shadow-fuchsia-500/20"
            >
              <Download className="h-4 w-4" />
              Installa Ora
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Prompt */}
      <Dialog open={isUpdateAvailable}>
        <DialogContent className="sm:max-w-md border-indigo-500/20 bg-zinc-950/95 backdrop-blur-xl">
          <DialogHeader className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 shadow-inner">
              <RefreshCw className="h-8 w-8 animate-spin-slow" />
            </div>
            <div className="space-y-1 text-center">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
                Aggiornamento Disponibile
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                Una nuova versione di Tabuu è pronta. Aggiorna per ottenere le ultime funzionalità.
              </DialogDescription>
            </div>
          </DialogHeader>
          <DialogFooter className="pt-4">
            <Button
              onClick={handleUpdate}
              className="w-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 text-white border-0 shadow-lg shadow-indigo-500/20"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Aggiorna e Ricarica
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
