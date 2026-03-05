import { ComponentPropsWithoutRef } from 'react';
import s from './Button.module.scss';
import clsx from 'clsx';
type ButtonProps = ComponentPropsWithoutRef<'button'> & {
	variant?: 'primary' | 'secondary';
};
export const Button = ({className, variant = 'primary', ...props}: ButtonProps) => {
   return <button className={clsx(s.button, s[variant], className)} {...props} />;
};
