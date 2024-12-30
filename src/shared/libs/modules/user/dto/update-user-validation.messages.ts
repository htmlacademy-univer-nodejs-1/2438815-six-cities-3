export const CreateUserValidationMessage = {
  userName: {
    minLength: 'Minimum name length must be 1',
    maxLength: 'Maximum name length must be 15',
  },
  email: {
    invalidFormat: 'email must be a valid address'
  },
  userType: {
    invalid: 'userType must be from names of elements from userTypes enum',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'min length for password is 6, max is 12'
  }
} as const;
