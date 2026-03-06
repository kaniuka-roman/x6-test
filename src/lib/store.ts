import { create } from 'zustand';
import { AccountType, Interests } from './constants';

type UserStore = {
   email: string;
   password: string;
   verified: boolean;
   nickname: string;
   accountType: AccountType;
   profileImage: File | null;
   interests: Interests[];
};

type UserAction = {
   updateUser: (user: Partial<UserStore>) => void;
   updateInterests: (interest: Interests) => void;
};

export const useUserStore = create<UserStore & UserAction>(set => {
   return {
      email: '',
      password: '',
      verified: false,
      nickname: '',
      accountType: 'Personal',
      profileImage: null,
      interests: [],
      updateUser: user =>
         set(store => {
            const userEntries = Object.entries(user);
            const filterFalsyEntries = userEntries.filter(([_, value]) => value !== undefined);
            const userObject = Object.fromEntries(filterFalsyEntries);
            return { ...store, ...userObject };
         }),
      updateInterests: interest =>
         set(store => ({
            interests: store.interests.includes(interest)
               ? store.interests.filter(i => i !== interest)
               : [...store.interests, interest],
         })),
   };
});
