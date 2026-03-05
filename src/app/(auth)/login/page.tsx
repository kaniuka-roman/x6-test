import s from './page.module.scss';
import { GoogleAuthButton } from '@/components/ui/GoogleAuthButton/GoogleAuthButton';
import { LoginForm } from './components/LoginForm/LoginForm';
import Link from 'next/link';
export default function LoginPage() {
   return (
      <div className={s.container}>
         <div className={s.header}>
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
            <Link href='/registration'>Create an account</Link>
         </div>
      </div>
   );
}
