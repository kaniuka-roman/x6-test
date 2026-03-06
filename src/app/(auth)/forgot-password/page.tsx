'use client';
import { Button } from '@/components/ui/Buttons/Button';
import { Input } from '@/components/ui/Inputs/Input';
import { useForgotPasswordStore } from '@/lib/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import s from './page.module.scss';
import { useRouter } from 'next/navigation';
const schema = z.object({
   email: z.string().email('Invalid email address'),
});
type ForgotForm = z.infer<typeof schema>;
export default function ForgotPasswordPage() {
	const router = useRouter();
   const email = useForgotPasswordStore(state => state.email);
   const updateData = useForgotPasswordStore(state => state.updateData);

   const { handleSubmit, register, formState: { errors} } = useForm<ForgotForm>({
		resolver: zodResolver(schema),
      defaultValues: {
         email,
      },
      mode: 'onTouched',
      values: {
         email,
      },
   });
   const onSubmit = (data: ForgotForm) => {
      console.log(data);
      updateData(data);
		router.push('/forgot-password/verification');
   };
   return (
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
         <Input label='Email' placeholder='Enter you email' type='email' {...register('email')} error={errors.email?.message} />
         <Button type='submit'>
            Send Code
         </Button>
      </form>
   );
}
