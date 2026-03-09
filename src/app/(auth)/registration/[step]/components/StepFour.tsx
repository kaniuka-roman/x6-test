'use client';
import { Button } from '@/components/ui/Buttons/Button';
import s from '../page.module.scss';
import { useRouter } from 'next/navigation';
import { Interests } from './Interests/Interests';
import { useUserStore } from '@/lib/store';
import { interestsOptions } from '@/lib/constants';
import { ButtonLink } from '@/components/ui/Buttons/ButtonLink';
import { CardTitle } from '@/components/ui/CardTitle/CardTitle';
import clsx from 'clsx';
export const StepFour = () => {
	const interests = useUserStore(state => state.interests);
	const updateInterests = useUserStore(state => state.updateInterests);
   const router = useRouter();
   return (
      <div className={clsx(s.container, s.stepFour)}>
         <div className={s.header}>
            <CardTitle>Let&apos;s get you set up!</CardTitle>
            <p className={s.cardSubtitle}>Step 4 of 4</p>
         </div>
         <Interests interests={interestsOptions} selectedInterests={interests} onSelect={updateInterests} />
         <div className={s.buttonsContainer}>
            <Button
               variant='secondary'
               type='button'
               onClick={() => router.replace('/registration/3')}>
               Back
            </Button>
            <ButtonLink href='/'>Finish</ButtonLink>
         </div>
      </div>
   );
};
