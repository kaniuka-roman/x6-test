'use client';
import { PasswordStrengthIndicator } from '@/components/shared/PasswordStrengthIndicator/PasswordStrengthIndicator';
import { Button } from '@/components/ui/Buttons/Button';
import { PasswordInput } from '@/components/ui/Inputs/PasswordInput';
import s from './page.module.scss';
import * as z from 'zod';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z
   .object({
      password: z
         .string()
         .min(6, 'Password too weak')
         .regex(/[0-9]/, 'Password too weak')
         .regex(/[a-z]/, 'Password too weak')
         .regex(/[^A-Za-z0-9]/, 'Password too weak'),
      confirmPassword: z.string(),
   })
   .refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
   });

type FormValues = z.infer<typeof schema>;
export default function NewPasswordPage() {
   const router = useRouter();
   const { handleSubmit, register, watch, formState: { errors, touchedFields } } = useForm<FormValues>({
      resolver: zodResolver(schema),
      mode: 'onTouched',
		resetOptions: {
			keepTouched: true
		},
      defaultValues: {
         password: '',
         confirmPassword: '',
      },
      values: {
         password: '',
         confirmPassword: '',
      },
   });
   const passwordValue = watch('password');
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
					error={errors.password?.message}
               {...register('password')}
            />
            <PasswordStrengthIndicator
               isShow={touchedFields.password}
               rules={strengthChecks}
               className={s.passwordStrengthIndicator}
            />
         </div>
         <PasswordInput
            label='Confirm New Password'
            placeholder='Confirm your new password'
				error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
         />
         <Button type='submit'>Login</Button>
      </form>
   );
}
