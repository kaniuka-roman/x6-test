import s from './page.module.scss';
import { ButtonLink } from '@/components/ui/Buttons/ButtonLink';

export default function Home() {
   return (
      <section className={s.section}>
         <ButtonLink href='/login'>Login</ButtonLink>
         <ButtonLink href='/registration'>Registration</ButtonLink>
         <ButtonLink href='/forgot-password'>Forgot password</ButtonLink>
      </section>
   );
}
