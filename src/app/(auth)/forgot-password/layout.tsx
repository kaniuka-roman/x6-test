import Link from 'next/link';
import s from './page.module.scss';
import { CardTitle } from '@/components/ui/CardTitle/CardTitle';

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className={s.container}>
         <div className={s.header}>
            <CardTitle >Forgot Password</CardTitle>
            <p className={s.cardSubtitle}>Create new password</p>
         </div>
         {children}
			<Link href='/login' className={s.backToLogin} >Back to login</Link>
      </div>
   );
}
