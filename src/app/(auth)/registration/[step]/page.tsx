import { StepOne } from './components/StepOne';
export default async function StepPage(props: PageProps<'/registration/[step]'>) {
   const { step } = await props.params;
   if (step === '1') return <StepOne />;
   if (step === '2') return <StepTwo />;
   if (step === '3') return <StepThree />;
}


const StepTwo = () => {
   return (
      <>
         <h1>Step Two</h1>
      </>
   );
};
const StepThree = () => {
   return (
      <>
         <h1>Step Three</h1>
      </>
   );
};
