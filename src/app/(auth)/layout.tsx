import { BrandBadge } from '@/components/ui/BrandBadge/BrandBadge';
import s from './layout.module.scss';
import { CrossIcon } from '@/components/icons/icons';
import Link from 'next/link';
import Image from 'next/image';
export default function AuthLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className={s.container}>
         <Link href='/' className={s.cancelButton}>
            <CrossIcon />
         </Link>
			<Image src='/BG.png' width={1420} height={832} alt='' className={s.backgroundImage} />
         <div className={s.card}>
            <div className={s.cardHeader}>
               <BrandBadge />
            </div>
            {children}
         </div>
      </div>
   );
}
