import { BrandBadge } from '@/components/ui/BrandBadge/BrandBadge';
import s from './layout.module.scss';
import { CrossIcon } from '@/components/icons/icons';
import Link from 'next/link';
export default function AuthLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className={s.container}>
         <Link href='/' className={s.cancelButton}>
            <CrossIcon />
         </Link>
         <div className={s.card}>
            <div className={s.cardHeader}>
               <BrandBadge />
            </div>
            {children}
         </div>
      </div>
   );
}
