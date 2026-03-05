'use client';
import { Input } from '@/components/ui/Inputs/Input';
import s from './LoginForm.module.scss';
import { PasswordInput } from '@/components/ui/Inputs/PasswordInput';
import { useForm } from 'react-hook-form';
import { Checkbox } from '@/components/ui/Inputs/Checkbox';
import Link from 'next/link';
import { Button } from '@/components/ui/Buttons/Button';

type LoginForm = {
   email: string;
   password: string;
   rememberMe: boolean;
};
export const LoginForm = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginForm>({
      defaultValues: {
         email: '',
         password: '',
         rememberMe: false,
      },
   });
   const onSubmit = (data: LoginForm) => console.log(data);
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
         <Button type='submit' className={s.button}>Continue</Button>
      </form>
   );
};
