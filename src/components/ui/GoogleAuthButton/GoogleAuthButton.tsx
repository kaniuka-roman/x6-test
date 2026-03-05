'use client';

import { signIn } from 'next-auth/react';
import s from './GoogleAuthButton.module.scss';
import { GoogleLogo } from '@/components/icons/icons';
import clsx from 'clsx';
export const GoogleAuthButton = ({className}: { className?: string}) => {
   const handleGoogleLogin = () => {
      signIn('google', { callbackUrl: '/' });
   };
   return (
      <button onClick={handleGoogleLogin} className={clsx(s.googleAuthButton, className)}>
			<GoogleLogo />
         Sign in with Google
      </button>
   );
};
