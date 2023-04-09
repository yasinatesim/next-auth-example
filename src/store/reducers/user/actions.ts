import { PayloadAction } from '@reduxjs/toolkit';

import { User } from '@/types/models';

export const setUserAction = (_state: any, action: PayloadAction<User>) => {
  return action.payload;
}

export const removeUserAction = () => {
  return null;
}
