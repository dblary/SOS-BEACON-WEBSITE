/**
 * SOS Beacon - Global Emergency Helplines Database
 * 30+ Countries with Police, Medical, Fire, and Universal Emergency Numbers
 */

const EMERGENCY_COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸', universal: '911', police: '911', medical: '911', fire: '911', notes: 'Instant dispatch with text-to-911 support' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', universal: '911', police: '911', medical: '911', fire: '911', notes: 'Supports English and French' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', universal: '999', police: '999', medical: '999', fire: '999', notes: 'Also accepts 112 across all networks' },
  { code: 'EU', name: 'European Union', flag: '🇪🇺', universal: '112', police: '112', medical: '112', fire: '112', notes: 'Standard European emergency number' },
  { code: 'IN', name: 'India', flag: '🇮🇳', universal: '112', police: '100', medical: '108', fire: '101', notes: 'Pan-India Emergency Response Support System (ERSS)' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', universal: '000', police: '000', medical: '000', fire: '000', notes: '112 redirects automatically on mobiles' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', universal: '111', police: '111', medical: '111', fire: '111', notes: 'Works even without mobile credit' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', universal: '110 / 119', police: '110', medical: '119', fire: '119', notes: 'Separate lines for police and fire/ambulance' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', universal: '112 / 119', police: '112', medical: '119', fire: '119', notes: '119 includes medical & rescue' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', universal: '999 / 995', police: '999', medical: '995', fire: '995', notes: '995 routes to Civil Defence Force' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', universal: '112', police: '110', medical: '112', fire: '112', notes: '112 for medical & fire; 110 for police' },
  { code: 'FR', name: 'France', flag: '🇫🇷', universal: '112', police: '17', medical: '15', fire: '18', notes: 'SAMU on 15, Sapeurs-Pompiers on 18' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', universal: '112', police: '113', medical: '118', fire: '115', notes: 'NUE 112 active in most regions' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', universal: '112', police: '091', medical: '061', fire: '080', notes: '112 provides multi-language operators' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', universal: '190', police: '190', medical: '192', fire: '193', notes: 'SAMU on 192, Polícia Militar on 190' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', universal: '911', police: '911', medical: '911', fire: '911', notes: 'Nationwide unified 911 dispatch' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', universal: '112', police: '10111', medical: '10177', fire: '10177', notes: '112 from any mobile network' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', universal: '999', police: '999', medical: '998', fire: '997', notes: '999 for Police, 998 for Ambulance' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', universal: '112', police: '117', medical: '144', fire: '118', notes: 'Rega air rescue on 1414' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', universal: '112', police: '112', medical: '112', fire: '112', notes: 'Non-emergency police: 0900-8844' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', universal: '112', police: '112', medical: '112', fire: '112', notes: 'Integrated nationwide dispatch on 112' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', universal: '112', police: '112', medical: '113', fire: '110', notes: '112 connects to police, 113 to medical' }
];

window.EMERGENCY_COUNTRIES = EMERGENCY_COUNTRIES;
