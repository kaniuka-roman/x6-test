'use client';

import { Input } from '@/components/ui/Inputs/Input';
import { PasswordInput } from '@/components/ui/Inputs/PasswordInput';
import s from '../page.module.scss';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Buttons/Button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordStrengthIndicator } from '@/components/shared/PasswordStrengthIndicator/PasswordStrengthIndicator';
import { useRouter } from 'next/navigation';

const schema = z
   .object({
      email: z.string().email('Invalid email address'),
      password: z
         .string()
         .min(6, 'At least 6 characters')
         .regex(/[0-9]/, 'At least one digit')
         .regex(/[a-z]/, 'At least one lowercase letter')
         .regex(/[^A-Za-z0-9]/, 'At least one special character'),
      confirmPassword: z.string(),
   })
   .refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
   });

type FormValues = z.infer<typeof schema>;
export const StepOne = () => {
   const router = useRouter();
   const { handleSubmit, register, watch } = useForm<FormValues>({
      resolver: zodResolver(schema),
      mode: 'onChange',
      defaultValues: {
         email: '',
         password: '',
         confirmPassword: '',
      },
   });
   const passwordValue = watch('password', '');
   const strengthChecks = [
      { label: 'At least 6 characters', met: passwordValue.length >= 6 },
      { label: 'At least 1 number', met: /[0-9]/.test(passwordValue) },
      { label: 'At least 1 lowercase letter', met: /[a-z]/.test(passwordValue) },
      { label: 'At least 1 special character', met: /[^A-Za-z0-9]/.test(passwordValue) },
   ];
   const onSubmit = (data: FormValues) => {
      console.log(data);
		router.push('/registration/2');
   };
   return (
      <>
         <div className={s.header}>
            <h2 className={s.cardTitle}>Welcome to X6sense</h2>
            <p className={s.cardSubtitle}>Create you free account now</p>
         </div>
         <form onSubmit={handleSubmit(onSubmit)} className={s.stepOneForm}>
            <Input label='Email' placeholder='Enter your email' {...register('email')} />
            <div>
               <PasswordInput
                  label='Create Password'
                  placeholder='Crete your password'
                  className={s.inputMarginTop}
                  {...register('password')}
               />
               <PasswordStrengthIndicator
                  isPasswordsMatch={passwordValue === watch('confirmPassword')}
                  rules={strengthChecks}
                  className={s.passwordStrengthIndicator}
               />
            </div>
            <PasswordInput
               label='Confirm Password'
               placeholder='Confirm your password'
               {...register('confirmPassword')}
            />
            <div className={s.buttonsContainer}>
               <Button variant='secondary' type='button' onClick={() => router.back()}>
                  Back
               </Button>
               <Button type='submit'>Continue</Button>
            </div>
         </form>
      </>
   );
};
