import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Download, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('User accepted the PWA install prompt')
      }
      
      setDeferredPrompt(null)
      setShowPrompt(false)
    } catch (error) {
      console.error('Error during PWA installation:', error)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setDeferredPrompt(null)
  }

  if (!showPrompt || !deferredPrompt) {
    return null
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-card/95 backdrop-blur border-accent/30 shadow-xl z-50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <Download className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-semibold text-foreground">{t('installApp')}</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 -mt-1"
            onClick={handleDismiss}
            aria-label={t('closeDialog')}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Install IndoBlockCloud for quick access and offline capabilities.
        </p>
        
        <div className="flex gap-2">
          <Button
            onClick={handleInstall}
            className="flex-1 bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90"
          >
            <Download className="h-4 w-4 mr-2" />
            {t('installApp')}
          </Button>
          <Button
            variant="outline"
            onClick={handleDismiss}
            className="border-accent/30"
          >
            Later
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}