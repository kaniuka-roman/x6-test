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
import { useUserStore } from '@/lib/store';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
const PASSWORD_LENGTH = 6;
const schema = z
   .object({
      email: z.string().email('Invalid email address'),
      password: z
         .string()
         .min(PASSWORD_LENGTH, `Password too weak`)
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

const defaultValues = {
         email: '',
         password: '',
         confirmPassword: '',
      }
export const StepOne = () => {
   const router = useRouter();
   const updateUser = useUserStore(state => state.updateUser);
   const email = useUserStore(state => {
		return state.email;
   });
	const [values, setValues] = useState(defaultValues);
   const {
      handleSubmit,
      register,
		getValues,
      watch,
      formState: { errors, touchedFields },
   } = useForm<FormValues>({
		resetOptions: {
			keepTouched: true
		},
      resolver: zodResolver(schema),
      mode: 'onTouched',
      defaultValues: defaultValues,
      values: values,
   });
	useEffect(() => {
		const values = getValues();
		setValues({...values, email});
	}, [email, getValues])
   const passwordValue = watch('password');
   useEffect(() => {
		return () => {
			console.log('🚀 ~ StepOne ~ passwordValue:', passwordValue);
			console.log('🚀 ~ StepOne ~ touchedFields:', touchedFields)
      };
   }, [passwordValue, touchedFields]);
   const strengthChecks = useMemo(
      () => [
         {
            label: `At least ${PASSWORD_LENGTH} characters`,
            met: (passwordValue || '').length >= PASSWORD_LENGTH,
         },
         { label: 'At least 1 number', met: /[0-9]/.test(passwordValue || '') },
         { label: 'At least 1 lowercase letter', met: /[a-z]/.test(passwordValue || '') },
         { label: 'At least 1 special character', met: /[^A-Za-z0-9]/.test(passwordValue || '') },
      ],
      [passwordValue],
   );
   const onSubmit = (data: FormValues) => {
      console.log(data);
      updateUser({ email: data.email, password: data.password });
      router.push('/registration/2');
   };
   return (
      <div className={s.container}>
         <div className={s.header}>
            <h2 className={s.cardTitle}>Welcome to X6sense</h2>
            <p className={s.cardSubtitle}>Step 1 of 4</p>
         </div>
         <form onSubmit={handleSubmit(onSubmit)} className={s.stepOneForm}>
            <Input
               label='Email'
               placeholder='Enter your email'
               {...register('email')}
               error={errors.email?.message}
            />
            <div>
               <PasswordInput
                  label='Create Password'
                  placeholder='Crete your password'
                  className={s.inputMarginTop}
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
               label='Confirm Password'
               placeholder='Confirm your password'
               error={errors.confirmPassword?.message}
               {...register('confirmPassword')}
            />
            <div className={s.buttonsContainer}>
               <Button
                  variant='secondary'
                  type='button'
                  onClick={() => router.replace('/registration')}>
                  Back
               </Button>
               <Button type='submit'>Continue</Button>
            </div>
         </form>
         <p className={s.agreement}>
            By joining you agree to the <span>Terms and Conditions</span> and 
            <span>Privacy Policy</span>
         </p>
         <div className={s.footer}>
            <span>Already have an account?</span>&nbsp;
            <Link href='/login'>Sign in</Link>
         </div>
      </div>
   );
};
