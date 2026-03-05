import { BrandBadge } from '@/components/ui/BrandBadge/BrandBadge';
import s from './page.module.scss';
import { GoogleAuthButton } from '@/components/ui/GoogleAuthButton/GoogleAuthButton';
import { LoginForm } from './components/LoginForm/LoginForm';
import Link from 'next/link';
export default function LoginPage() {
   return (
      <div className={s.container}>
         <div className={s.card}>
            <div className={s.cardHeader}>
               <BrandBadge />
               <h2 className={s.cardTitle}>Welcome back</h2>
               <p className={s.cardSubtitle}>Sign in to account to continue</p>
               <GoogleAuthButton className={s.googleAuthButton} />
            </div>
            <div className={s.separator}>
               <p>or</p>
            </div>
            <LoginForm />
            <div className={s.cardFooter}>
               <span>New to X6sense?</span>
               &nbsp;
               <Link href='/register'>Create an account</Link>
            </div>
         </div>
      </div>
   );
}
