import { configureStore } from '@reduxjs/toolkit';

import user from '@/store/reducers/user';

export const store = configureStore({
  reducer: {
    user,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
