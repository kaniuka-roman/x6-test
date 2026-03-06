'use client';
import { PasswordStrengthIndicator } from '@/components/shared/PasswordStrengthIndicator/PasswordStrengthIndicator';
import { Button } from '@/components/ui/Buttons/Button';
import { PasswordInput } from '@/components/ui/Inputs/PasswordInput';
import s from './page.module.scss';
import * as z from 'zod';
import { useMemo } from 'react';
import { useForgotPasswordStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z
   .object({
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
export default function NewPasswordPage() {
   const router = useRouter();
   const { handleSubmit, register, watch } = useForm<FormValues>({
      resolver: zodResolver(schema),
      mode: 'onChange',
      defaultValues: {
         password: '',
         confirmPassword: '',
      },
      values: {
         password: '',
         confirmPassword: '',
      },
   });
   const [passwordValue, confirmPasswordValue] = watch(['password', 'confirmPassword']);
   const strengthChecks = useMemo(
      () => [
         { label: 'At least 6 characters', met: (passwordValue || '').length >= 6 },
         { label: 'At least 1 number', met: /[0-9]/.test(passwordValue || '') },
         { label: 'At least 1 lowercase letter', met: /[a-z]/.test(passwordValue || '') },
         { label: 'At least 1 special character', met: /[^A-Za-z0-9]/.test(passwordValue || '') },
      ],
      [passwordValue],
   );
   const onSubmit = (data: FormValues) => {
      console.log(data);
      router.push('/login');
   };
   return (
      <form onSubmit={handleSubmit(onSubmit)} className={s.newPassword}>
         <div>
            <PasswordInput
               label='Create New Password'
               placeholder='Crete your new password'
               {...register('password')}
            />
            <PasswordStrengthIndicator
               isPasswordsMatch={passwordValue === confirmPasswordValue}
               rules={strengthChecks}
               className={s.passwordStrengthIndicator}
            />
         </div>
         <PasswordInput
            label='Confirm New Password'
            placeholder='Confirm your new password'
            {...register('confirmPassword')}
         />
         <Button type='submit'>Login</Button>
      </form>
   );
}
