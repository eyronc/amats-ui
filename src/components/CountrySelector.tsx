import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { Check, ChevronDown, Search, Phone } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  flag: string;
  phoneCode: string;
  currency: string;
  currencySymbol: string;
}

const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', phoneCode: '+1', currency: 'USD', currencySymbol: '$' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', phoneCode: '+63', currency: 'PHP', currencySymbol: '₱' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', phoneCode: '+44', currency: 'GBP', currencySymbol: '£' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', phoneCode: '+1', currency: 'CAD', currencySymbol: 'C$' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', phoneCode: '+61', currency: 'AUD', currencySymbol: 'A$' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', phoneCode: '+49', currency: 'EUR', currencySymbol: '€' },
  { code: 'FR', name: 'France', flag: '🇫🇷', phoneCode: '+33', currency: 'EUR', currencySymbol: '€' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', phoneCode: '+81', currency: 'JPY', currencySymbol: '¥' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', phoneCode: '+82', currency: 'KRW', currencySymbol: '₩' },
  { code: 'CN', name: 'China', flag: '🇨🇳', phoneCode: '+86', currency: 'CNY', currencySymbol: '¥' },
  { code: 'IN', name: 'India', flag: '🇮🇳', phoneCode: '+91', currency: 'INR', currencySymbol: '₹' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', phoneCode: '+55', currency: 'BRL', currencySymbol: 'R$' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', phoneCode: '+52', currency: 'MXN', currencySymbol: '$' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', phoneCode: '+34', currency: 'EUR', currencySymbol: '€' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', phoneCode: '+39', currency: 'EUR', currencySymbol: '€' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', phoneCode: '+7', currency: 'RUB', currencySymbol: '₽' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', phoneCode: '+65', currency: 'SGD', currencySymbol: 'S$' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', phoneCode: '+66', currency: 'THB', currencySymbol: '฿' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', phoneCode: '+60', currency: 'MYR', currencySymbol: 'RM' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', phoneCode: '+62', currency: 'IDR', currencySymbol: 'Rp' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', phoneCode: '+84', currency: 'VND', currencySymbol: '₫' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', phoneCode: '+971', currency: 'AED', currencySymbol: 'د.إ' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', phoneCode: '+966', currency: 'SAR', currencySymbol: '﷼' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', phoneCode: '+27', currency: 'ZAR', currencySymbol: 'R' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', phoneCode: '+20', currency: 'EGP', currencySymbol: '£' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', phoneCode: '+234', currency: 'NGN', currencySymbol: '₦' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', phoneCode: '+254', currency: 'KES', currencySymbol: 'KSh' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', phoneCode: '+54', currency: 'ARS', currencySymbol: '$' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', phoneCode: '+56', currency: 'CLP', currencySymbol: '$' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', phoneCode: '+57', currency: 'COP', currencySymbol: '$' },
];

interface CountrySelectorProps {
  value?: Country;
  onSelect: (country: Country) => void;
  phoneNumber: string;
  onPhoneNumberChange: (phoneNumber: string) => void;
}

export function CountrySelector({ value, onSelect, phoneNumber, onPhoneNumberChange }: CountrySelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedCountry = value || countries.find(c => c.code === 'PH') || countries[0];

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (country: Country) => {
    onSelect(country);
    setOpen(false);
    
    // Auto-fill phone number with country code if phone number is empty or doesn't start with country code
    if (!phoneNumber || !phoneNumber.startsWith(country.phoneCode)) {
      // Extract the number part (remove any existing country code)
      let numberPart = phoneNumber;
      for (const c of countries) {
        if (phoneNumber.startsWith(c.phoneCode)) {
          numberPart = phoneNumber.substring(c.phoneCode.length);
          break;
        }
      }
      
      // For Philippines, add the 9 prefix if it doesn't exist
      if (country.code === 'PH' && numberPart && !numberPart.startsWith('9')) {
        numberPart = '9' + numberPart;
      }
      
      onPhoneNumberChange(country.phoneCode + numberPart);
    }
  };

  return (
    <div className="flex space-x-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-24 justify-between"
          >
            <span className="text-lg">{selectedCountry.flag}</span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <Command>
            <CommandInput placeholder="Search countries..." />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.name}
                  onSelect={() => handleSelect(country)}
                  className="flex items-center space-x-2"
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="flex-1">{country.name}</span>
                  <span className="text-sm text-muted-foreground">{country.phoneCode}</span>
                  <Check
                    className={`ml-auto h-4 w-4 ${
                      selectedCountry.code === country.code ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      
      <div className="flex-1 relative">
        <Input
          type="tel"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
          className="pl-16 pr-20"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
          {selectedCountry.phoneCode}
        </div>
        {phoneNumber && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-green-100 hover:text-green-600"
              onClick={() => window.open(`tel:${phoneNumber}`, '_self')}
              title="Call this number"
            >
              <Phone className="h-3 w-3" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-blue-100 hover:text-blue-600"
              onClick={() => {
                navigator.clipboard.writeText(phoneNumber);
                // You could add a toast notification here
              }}
              title="Copy number"
            >
              <Check className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export { countries };
export type { Country };