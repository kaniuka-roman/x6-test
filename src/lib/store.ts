import { create } from 'zustand';
import { AccountType } from './constants';

type UserStore = {
   email: string;
   password: string;
   verified: boolean;
   nickname: string;
   account_type: AccountType;
};

type UserAction = {
   updateUser: (user: Partial<UserStore>) => void;
};

export const useUserStore = create<UserStore & UserAction>(set => ({
   email: '',
   password: '',
   verified: false,
   nickname: '',
   account_type: 'Personal',
   updateUser: user =>
      set(store => {
			const userEntries = Object.entries(user)
			const filterFalsyEntries = userEntries.filter(([_, value]) => value !== undefined)
			const userObject = Object.fromEntries(filterFalsyEntries)
         return { ...store, ...userObject };
      }),
}));
