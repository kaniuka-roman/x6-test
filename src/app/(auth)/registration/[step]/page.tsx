import Link from 'next/link';
import { StepFour } from './components/StepFour';
import { StepOne } from './components/StepOne';
import { StepThree } from './components/StepThree';
import { StepTwo } from './components/StepTwo';
import { ButtonLink } from '@/components/ui/Buttons/ButtonLink';
export default async function StepPage(props: PageProps<'/registration/[step]'>) {
   const { step } = await props.params;
   if (step === '1') return <StepOne />;
   if (step === '2') return <StepTwo />;
   if (step === '3') return <StepThree />;
   if (step === '4') return <StepFour />;
   return (
      <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', gap: 12}}>
         <h2>404</h2>
			<p>page not found</p>
			<ButtonLink href='/registration'>Back to registration</ButtonLink>
      </div>
   );
}
