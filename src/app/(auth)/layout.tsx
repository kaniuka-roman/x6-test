import { BrandBadge } from "@/components/ui/BrandBadge/BrandBadge";
import s from "./layout.module.scss";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className={s.container}>
         <div className={s.card}>
            <div className={s.cardHeader}>
               <BrandBadge />
            </div>
				{children}
         </div>
      </div>
   );
}
