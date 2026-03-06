'use client';

import { Button } from '@/components/ui/Buttons/Button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/Inputs/InputOTP';
import { useForgotPasswordStore } from '@/lib/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import s from './page.module.scss';
import * as z from 'zod';

const schema = z.object({
   otp: z.string().length(6, 'OTP must be 6 digits'),
});
type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordVerificationPage() {
   const router = useRouter();
   const [verifying, setVerifying] = useState(false);
   const updateData = useForgotPasswordStore(state => state.updateData);
   const email = useForgotPasswordStore(state => state.email);
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
            updateData({ verified: true });
            router.push('/forgot-password/new-password');
         }, 1200);
      }
      console.log(data);
   };
   return (
      <form onSubmit={handleSubmit(onSubmit)} className={s.verification}>
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
            Next
         </Button>
      </form>
   );
}
