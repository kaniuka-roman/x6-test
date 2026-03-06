'use client';
import { Input } from '@/components/ui/Inputs/Input';
import s from './LoginForm.module.scss';
import { PasswordInput } from '@/components/ui/Inputs/PasswordInput';
import { useForm } from 'react-hook-form';
import { Checkbox } from '@/components/ui/Inputs/Checkbox';
import Link from 'next/link';
import { Button } from '@/components/ui/Buttons/Button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
   email: z.string().trim().min(1, 'Email is required').email('Invalid email address'),
   password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters'),
   rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;
export const LoginForm = () => {
   const {
      register,
      handleSubmit,
   } = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
      defaultValues: {
         email: '',
         password: '',
         rememberMe: false,
      },
   });
   const onSubmit = (data: LoginFormValues) => console.log(data);
   return (
      <form onSubmit={handleSubmit(onSubmit)} className={s.loginForm}>
         <Input label='Email' placeholder='Enter you email' type='email' {...register('email')} />
         <PasswordInput
            label='Password'
            placeholder='Enter you password'
            {...register('password')}
         />
         <div className={s.loginFormBottom}>
            <Checkbox label='Remember me' {...register('rememberMe')} />
            <Link href='/forgot-password'>Forgot password?</Link>
         </div>
         <Button type='submit' className={s.button}>
            Continue
         </Button>
      </form>
   );
};
