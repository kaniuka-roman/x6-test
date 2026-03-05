import { GoogleAuthButton } from '@/components/ui/GoogleAuthButton/GoogleAuthButton';
import s from './page.module.scss';
import { ButtonLink } from '@/components/ui/Buttons/ButtonLink';
import Link from 'next/link';
export default function RegistrationPage() {
   return (
      <>
         <div className={s.header}>
            <h2 className={s.cardTitle}>Welcome to X6sense</h2>
            <p className={s.cardSubtitle}>Create you free account now</p>
         </div>
         <div className={s.signInContainer}>
            <GoogleAuthButton className={s.googleAuthButton} />
            <div className={s.separator}>
               <p>or</p>
            </div>
            <ButtonLink href='/registration/1'>Continue with email</ButtonLink>
         </div>
      </>
   );
}
