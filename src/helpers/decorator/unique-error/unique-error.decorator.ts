import { Table } from '@/constantes/model-list';
import { SetMetadata } from '@nestjs/common';

export const UNIQUE_ERROR_KEY = 'unique-error';

// error for unique field: this value already in use
export const UniqueError = (fields: string[] | string) =>
  SetMetadata(UNIQUE_ERROR_KEY, fields);
