export const VALIDATION_CODE_TYPE_ACCOUNT = {
  register: 1,
  resetPassword: 2,
};

export type ValidationCodeType =
  (typeof VALIDATION_CODE_TYPE_ACCOUNT)[keyof typeof VALIDATION_CODE_TYPE_ACCOUNT];
