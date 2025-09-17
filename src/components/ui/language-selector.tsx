import { Languages, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslation } from "react-i18next"

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
]

export function LanguageSelector() {
  const { i18n } = useTranslation()

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
  }

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="bg-background/50 backdrop-blur border-accent/30"
          aria-label="Select language"
        >
          <Languages className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur border-accent/30">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`${
              i18n.language === language.code ? "bg-accent/20" : ""
            } flex items-center justify-between min-w-[160px]`}
          >
            <div className="flex items-center">
              <span className="mr-3 text-lg">{language.flag}</span>
              <span>{language.name}</span>
            </div>
            {i18n.language === language.code && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}