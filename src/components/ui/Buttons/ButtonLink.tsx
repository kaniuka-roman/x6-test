import Link from 'next/link';
import s from './Button.module.scss';

export const ButtonLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
   return (
      <Link href={href} className={s.button}>
         {children}
      </Link>
   );
};
