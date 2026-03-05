import { Logo } from '@/components/icons/icons';
import s from './BrandBadge.module.scss';

export const BrandBadge = () => {
   return (
      <div className={s.brandBadge}>
         <Logo className={s.logo} />
         <span>X6sense</span>
      </div>
   );
};
