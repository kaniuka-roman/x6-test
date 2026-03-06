'use client';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import s from './Input.module.scss';
import clsx from 'clsx';
import { OpenEye, WarningIcon } from '@/components/icons/icons';

export const PasswordInput = ({
   className,
   error,
   ...props
}: ComponentPropsWithoutRef<'input'> & { label: string; error?: string | null }) => {
   const [isHidden, setIsHidden] = useState(true);
   const [oldError, setOldError] = useState<string | null>(null);
   useEffect(() => {
      if (error) setOldError(error);
   }, [error]);
   return (
      <div className={s.inputContainer}>
         <label htmlFor={props.name} className={s.label}>
            {props.label}
         </label>
         <div className={s.passwordInputWrapper}>
            <input
               type={isHidden ? 'password' : 'text'}
               id={props.name}
               className={clsx(s.passwordInput, className)}
               {...props}
            />
            <button type='button' className={s.hideButton} onClick={() => setIsHidden(!isHidden)}>
               <OpenEye />
            </button>
         </div>
         <div className={clsx(s.warning, !!error && s.active)}>
            <WarningIcon />
            <p>{oldError}</p>
         </div>
      </div>
   );
};
