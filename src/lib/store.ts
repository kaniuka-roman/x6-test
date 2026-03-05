import { create } from 'zustand';
import { AccountType } from './constants';

type UserStore = {
   email: string;
   password: string;
   verified: boolean;
   nickname: string;
   account_type: AccountType;
	profileImage: File | null
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
	profileImage: null,
   updateUser: user =>
      set(store => {
			const userEntries = Object.entries(user)
			const filterFalsyEntries = userEntries.filter(([_, value]) => value !== undefined)
			const userObject = Object.fromEntries(filterFalsyEntries)
         return { ...store, ...userObject };
      }),
}));
