import { StepFour } from './components/StepFour';
import { StepOne } from './components/StepOne';
import { StepThree } from './components/StepThree';
import { StepTwo } from './components/StepTwo';
export default async function StepPage(props: PageProps<'/registration/[step]'>) {
   const { step } = await props.params;
   if (step === '1') return <StepOne />;
   if (step === '2') return <StepTwo />;
   if (step === '3') return <StepThree />;
   if (step === '4') return <StepFour />;
}
