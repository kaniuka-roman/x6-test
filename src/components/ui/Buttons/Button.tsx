import { ComponentPropsWithoutRef } from 'react';
import s from './Button.module.scss';
import clsx from 'clsx';
import { SpinnerIcon } from '@/components/icons/icons';
type ButtonProps = ComponentPropsWithoutRef<'button'> & {
   variant?: 'primary' | 'secondary';
   isLoading?: boolean;
};
export const Button = ({ className, variant = 'primary', children, isLoading, ...props }: ButtonProps) => {
   return (
      <button className={clsx(s.button, s[variant], className)} {...props}>
         {isLoading ? <SpinnerIcon className={s.spinner} /> : children}
      </button>
   );
};
