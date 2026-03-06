import Link from 'next/link';
import s from './page.module.scss';

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className={s.container}>
         <div className={s.header}>
            <h2 className={s.cardTitle}>Forgot Password</h2>
            <p className={s.cardSubtitle}>Create new password</p>
         </div>
         {children}
			<Link href='/login' className={s.backToLogin} >Back to login</Link>
      </div>
   );
}
