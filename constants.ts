
import { Country, Difficulty } from './types';

export const QUESTIONS_COUNT = 10;
export const TIMER_DURATION = 15; // seconds per question

export const COUNTRIES: Country[] = [
  // EASY
  { name: 'United States', code: 'us', region: 'Americas', difficulty: Difficulty.EASY },
  { name: 'France', code: 'fr', region: 'Europe', difficulty: Difficulty.EASY },
  { name: 'Japan', code: 'jp', region: 'Asia', difficulty: Difficulty.EASY },
  { name: 'Brazil', code: 'br', region: 'Americas', difficulty: Difficulty.EASY },
  { name: 'United Kingdom', code: 'gb', region: 'Europe', difficulty: Difficulty.EASY },
  { name: 'Canada', code: 'ca', region: 'Americas', difficulty: Difficulty.EASY },
  { name: 'Australia', code: 'au', region: 'Oceania', difficulty: Difficulty.EASY },
  { name: 'Germany', code: 'de', region: 'Europe', difficulty: Difficulty.EASY },
  { name: 'China', code: 'cn', region: 'Asia', difficulty: Difficulty.EASY },
  { name: 'Italy', code: 'it', region: 'Europe', difficulty: Difficulty.EASY },
  { name: 'India', code: 'in', region: 'Asia', difficulty: Difficulty.EASY },
  { name: 'Spain', code: 'es', region: 'Europe', difficulty: Difficulty.EASY },
  { name: 'Egypt', code: 'eg', region: 'Africa', difficulty: Difficulty.EASY },
  { name: 'Russia', code: 'ru', region: 'Europe', difficulty: Difficulty.EASY },
  { name: 'Mexico', code: 'mx', region: 'Americas', difficulty: Difficulty.EASY },

  // MEDIUM
  { name: 'Vietnam', code: 'vn', region: 'Asia', difficulty: Difficulty.MEDIUM },
  { name: 'Poland', code: 'pl', region: 'Europe', difficulty: Difficulty.MEDIUM },
  { name: 'Nigeria', code: 'ng', region: 'Africa', difficulty: Difficulty.MEDIUM },
  { name: 'Peru', code: 'pe', region: 'Americas', difficulty: Difficulty.MEDIUM },
  { name: 'Turkey', code: 'tr', region: 'Asia', difficulty: Difficulty.MEDIUM },
  { name: 'Sweden', code: 'se', region: 'Europe', difficulty: Difficulty.MEDIUM },
  { name: 'Thailand', code: 'th', region: 'Asia', difficulty: Difficulty.MEDIUM },
  { name: 'Colombia', code: 'co', region: 'Americas', difficulty: Difficulty.MEDIUM },
  { name: 'Ukraine', code: 'ua', region: 'Europe', difficulty: Difficulty.MEDIUM },
  { name: 'South Africa', code: 'za', region: 'Africa', difficulty: Difficulty.MEDIUM },
  { name: 'Greece', code: 'gr', region: 'Europe', difficulty: Difficulty.MEDIUM },
  { name: 'Switzerland', code: 'ch', region: 'Europe', difficulty: Difficulty.MEDIUM },
  { name: 'Austria', code: 'at', region: 'Europe', difficulty: Difficulty.MEDIUM },
  { name: 'Norway', code: 'no', region: 'Europe', difficulty: Difficulty.MEDIUM },
  { name: 'Indonesia', code: 'id', region: 'Asia', difficulty: Difficulty.MEDIUM },

  // HARD
  { name: 'Lesotho', code: 'ls', region: 'Africa', difficulty: Difficulty.HARD },
  { name: 'Kiribati', code: 'ki', region: 'Oceania', difficulty: Difficulty.HARD },
  { name: 'Andorra', code: 'ad', region: 'Europe', difficulty: Difficulty.HARD },
  { name: 'Bhutan', code: 'bt', region: 'Asia', difficulty: Difficulty.HARD },
  { name: 'Suriname', code: 'sr', region: 'Americas', difficulty: Difficulty.HARD },
  { name: 'Djibouti', code: 'dj', region: 'Africa', difficulty: Difficulty.HARD },
  { name: 'Eritrea', code: 'er', region: 'Africa', difficulty: Difficulty.HARD },
  { name: 'Palau', code: 'pw', region: 'Oceania', difficulty: Difficulty.HARD },
  { name: 'Togo', code: 'tg', region: 'Africa', difficulty: Difficulty.HARD },
  { name: 'Gabon', code: 'ga', region: 'Africa', difficulty: Difficulty.HARD },
  { name: 'Dominica', code: 'dm', region: 'Americas', difficulty: Difficulty.HARD },
  { name: 'Eswatini', code: 'sz', region: 'Africa', difficulty: Difficulty.HARD },
  { name: 'Liechtenstein', code: 'li', region: 'Europe', difficulty: Difficulty.HARD },
  { name: 'San Marino', code: 'sm', region: 'Europe', difficulty: Difficulty.HARD },
  { name: 'Comoros', code: 'km', region: 'Africa', difficulty: Difficulty.HARD },
];
