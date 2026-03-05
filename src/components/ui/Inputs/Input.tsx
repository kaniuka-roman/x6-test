import { ComponentPropsWithoutRef } from 'react';
import s from './Input.module.scss';
import clsx from 'clsx';

export const Input = ({ className, ...props }: ComponentPropsWithoutRef<'input'> & {label: string}) => {
   return (
      <div className={s.inputContainer}>
         <label htmlFor={props.name} className={s.label}>
            {props.label}
         </label>
         <input type='text' id={props.name} className={clsx(s.input, className)} {...props} />
      </div>
   );
};
