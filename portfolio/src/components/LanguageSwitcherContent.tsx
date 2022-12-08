import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Locales, locales } from '../i18n';
import { HiChevronDown } from 'react-icons/hi2';

type LanguageSwitcherContentProps = {
    currentLocale: string;
    currentPath: string;
}

const localeNames: Record<Locales, string> = {
    en: 'English',
    fr: 'Français',
}

const LanguageSwitcherContent = ({currentLocale, currentPath}:LanguageSwitcherContentProps) => {

    const getNextLocalePath = (locale: string) => 
        currentPath.startsWith(`/${currentLocale}`)
            ? currentPath.replace(`/${currentLocale}`, `/${locale}`)
            : `/${locale}`
            
  return (
    <div className="relative inline-block text-left">
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
        <button className="flex items-center w-12 h-6 gap-2 border border-outline bg-bg2 pr-2 rounded-full">
                    <img
                        src={`/flags/${currentLocale}.png`}
                        alt={currentLocale}
                        className="border border-outline h-full aspect-square object-cover object-center rounded-full"
                    />
                    <HiChevronDown className="w-3 h-3 text-text" strokeWidth={2} />
                </button>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="end"
            className='mt-2 -mr-1 bg-bg1 rounded shadow-lg'
          >
            {locales
                .filter(locale => locale !== currentLocale)
                .map((locale) => (
              <DropdownMenuPrimitive.Item
              key={locale}              
              >
                <a href={getNextLocalePath(locale)} className='py-2 px-4 flex items-center gap-2'>
                <span className="flex-1 text-text">
                    {localeNames[locale]}
                </span>
                 <span className="flex items-center w-5 h-5 rounded-full overflow-hidden">
                    <img
                        src={`/flags/${locale}.png`}
                        alt={locale}
                        className="w-full h-full object-cover object-center"
                    />
                    </span>
                </a>
                    
              </DropdownMenuPrimitive.Item>
            ))}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  );
};

export default LanguageSwitcherContent;