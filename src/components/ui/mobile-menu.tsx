import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MobileMenuProps {
  children: React.ReactNode;
}

export function MobileMenu({ children }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden fixed top-4 left-4 z-50 bg-background/80 backdrop-blur border border-border/50"
          aria-label={t('menuButton')}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64 bg-card/95 backdrop-blur border-r border-border/50">
        <div onClick={() => setOpen(false)}>
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}