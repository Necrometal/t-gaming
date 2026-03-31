import { addDay, addMinute, addMonth, addSecond, addYear } from '@formkit/tempo';
import type { TimeType } from '@/constantes/global';

export const dateAfter = (date: string | Date, toAdd: number, time: TimeType = 'day') => {
  switch (time) {
    case 'second':
      return addSecond(date, toAdd);
    case 'min':
      return addMinute(date, toAdd);
    case 'day':
      return addDay(date, toAdd);
    case 'week':
      return addDay(date, toAdd * 7);
    case 'month':
      return addMonth(date, toAdd);
    default:
      return addYear(date, toAdd);
  }
};
