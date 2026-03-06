'use client';
import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import s from './Input.module.scss';
import clsx from 'clsx';
import { WarningIcon } from '@/components/icons/icons';

export const Input = ({
   className,
   error,
   ...props
}: ComponentPropsWithoutRef<'input'> & { label: string; error?: string | null }) => {
   const [oldError, setOldError] = useState<string | null>(null);
   useEffect(() => {
      if (error) setOldError(error);
   }, [error]);
   return (
      <div className={s.inputContainer}>
         <label htmlFor={props.name} className={s.label}>
            {props.label}
         </label>
         <input type='text' id={props.name} className={clsx(s.input, className)} {...props} />
         <div className={clsx(s.warning, !!error && s.active)}>
            <WarningIcon />
            <p>{oldError}</p>
         </div>
      </div>
   );
};
