'use client';

import s from '../page.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Buttons/Button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/Inputs/InputOTP';
import {  useState } from 'react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

const schema = z.object({
   otp: z.string().length(6, 'OTP must be 6 digits'),
});

type FormValues = z.infer<typeof schema>;
export const StepTwo = () => {
   const router = useRouter();
   const [verifying, setVerifying] = useState(false);
   const updateUser = useUserStore(state => state.updateUser);
   const email = useUserStore(state => state.email);
   const { handleSubmit, control } = useForm<FormValues>({
      resolver: zodResolver(schema),
      mode: 'onChange',
      defaultValues: {
         otp: '',
      },
   });

   const onSubmit = (data: FormValues) => {
      if (data.otp.length === 6) {
         setVerifying(true);
         setTimeout(() => {
            setVerifying(false);
            updateUser({ verified: true });
            router.push('/registration/3');
         }, 1200);
      }
      console.log(data);
   };
   return (
      <div className={s.container}>
         <div className={s.header}>
            <h2 className={s.cardTitle}>Verify your email</h2>
            <p className={s.cardSubtitle}>Step 2 of 4</p>
         </div>
         <form onSubmit={handleSubmit(onSubmit)} className={s.stepTwoForm}>
            <div className={s.textWrapper}>
               <p className={s.text}>Please enter the code sent to</p>
               <p className={s.email}>{email}</p>
            </div>
            <Controller
               name='otp'
               control={control}
               render={({ field }) => (
                  <InputOTP
                     maxLength={6}
                     name={field.name}
                     value={field.value}
                     onChange={field.onChange}
                     pattern={REGEXP_ONLY_DIGITS}>
                     <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                     </InputOTPGroup>
                  </InputOTP>
               )}
            />

            <Button type='submit' isLoading={verifying}>
               Verify
            </Button>
         </form>
         <div className={s.footer}>
            <span>Didn&apos;t receive the code? </span>&nbsp;
            <span className={s.link}>Resend code</span>
         </div>
      </div>
   );
};
