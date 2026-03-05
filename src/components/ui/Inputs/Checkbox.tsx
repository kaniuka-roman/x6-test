import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import s from './Input.module.scss';
import { Check } from '@/components/icons/icons';
export const Checkbox = ({ className, ...props }: ComponentPropsWithoutRef<'input'> & {label: string}) => {
   return (
      <div className={s.checkboxContainer}>
         <input type='checkbox' id={props.name} className={clsx(s.checkbox)} {...props} />
         <label htmlFor={props.name} className={s.label}>
            <span className={clsx(s.customCheckbox, className)}>
               <Check />
            </span>
            {props.label}
         </label>
      </div>
   );
};
