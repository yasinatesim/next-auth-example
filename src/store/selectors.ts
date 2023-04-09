
import { UserState } from './reducers/user/types';

import { AppState } from '@/types/state';

export const getUser = (state: AppState): UserState => state.user;
