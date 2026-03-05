import { ComponentPropsWithoutRef } from 'react';
import s from './Button.module.scss';
import clsx from 'clsx';

export const Button = ({className, ...props}: ComponentPropsWithoutRef<'button'>) => {
   return <button className={clsx(s.button, className)} {...props} />;
};
