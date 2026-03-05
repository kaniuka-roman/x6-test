import Link from 'next/link';
import s from './page.module.scss';
export default function RegistrationLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className={s.container}>
         {children}
         <p className={s.agreement}>
            By joining you agree to the <span>Terms and Conditions</span> and 
            <span>Privacy Policy</span>
         </p>
         <div className={s.footer}>
            <span>Already have an account?</span>&nbsp;
            <Link href='/login'>Sign in</Link>
         </div>
      </div>
   );
}
