import Link, { LinkProps } from 'next/link';
import s from './Button.module.scss';
import clsx from 'clsx';
type ButtonProps = LinkProps & {
   className?: string;
   children: React.ReactNode;
   variant?: 'primary' | 'secondary';
};
export const ButtonLink = ({ className, children, variant = 'primary', ...props }: ButtonProps) => {
   return (
      <Link {...props} className={clsx(s.button, s[variant], className)}>
         {children}
      </Link>
   );
};
