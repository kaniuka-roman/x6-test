'use client';
import { ComponentPropsWithoutRef, useState } from 'react';
import s from './Input.module.scss';
import clsx from 'clsx';
import { OpenEye } from '@/components/icons/icons';

export const PasswordInput = ({
   className,
   ...props
}: ComponentPropsWithoutRef<'input'> & { label: string }) => {
   const [isHidden, setIsHidden] = useState(true);
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
      </div>
   );
};
