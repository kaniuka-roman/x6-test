import { GoogleAuthButton } from '@/components/ui/GoogleAuthButton/GoogleAuthButton';
import s from './page.module.scss';
import { ButtonLink } from '@/components/ui/Buttons/ButtonLink';
import Link from 'next/link';
import { CardTitle } from '@/components/ui/CardTitle/CardTitle';
export default function RegistrationPage() {
   return (
      <div className={s.container}>
         <div className={s.header}>
            <CardTitle>Welcome to X6sense</CardTitle>
            <p className={s.cardSubtitle}>Create you free account now</p>
         </div>
         <div className={s.signInContainer}>
            <GoogleAuthButton className={s.googleAuthButton} />
            <div className={s.separator}>
               <p>or</p>
            </div>
            <ButtonLink href='/registration/1'>Continue with email</ButtonLink>
         </div>
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
