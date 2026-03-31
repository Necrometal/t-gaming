export const fields = ['user', 'role'] as const;

export type Table = (typeof fields)[number];
