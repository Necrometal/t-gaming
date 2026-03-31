export const CODE_DURATION = 'CODE_DURATION';

export const TIME_TYPE = ['second', 'min', 'hour', 'day', 'week', 'month', 'year'] as const;
export type TimeType = (typeof TIME_TYPE)[number];
