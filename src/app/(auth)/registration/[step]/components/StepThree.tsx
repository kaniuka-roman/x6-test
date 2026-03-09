'use client';

import { Input } from '@/components/ui/Inputs/Input';
import s from '../page.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Buttons/Button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store';
import { ImageUploader } from '@/components/shared/ImageUploader/ImageUploader';
import { Select } from '@/components/ui/Select/Select';
import { accountTypes } from '@/lib/constants';
import { CardTitle } from '@/components/ui/CardTitle/CardTitle';
import clsx from 'clsx';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const schema = z.object({
   nickname: z.string().min(1, 'Nickname is required').min(2, 'Too short'),
   accountType: z.literal(accountTypes.map(item => item.name)),
   profileImage: z
      .any()
		.optional()
      .refine(file => file?.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
      .refine(
         file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
         '.jpg, .jpeg and .png files are accepted.',
      )
      .nullable(),
});

type FormValues = z.infer<typeof schema>;
export const StepThree = () => {
   const router = useRouter();
	const nickname = useUserStore(state => state.nickname);
	const accountType = useUserStore(state => state.accountType);
	const profileImage = useUserStore(state => state.profileImage);
	const updateUser = useUserStore(state => state.updateUser);
   const { handleSubmit, register, control, formState: { errors } } = useForm<FormValues>({
      resolver: zodResolver(schema),
      mode: 'onTouched',
      defaultValues: {
         nickname: '',
         accountType,
         profileImage: null,
      },
		values: {
			nickname,
			accountType,
			profileImage,
		}
   });
   const onSubmit = (data: FormValues) => {
      console.log(data);
		updateUser(data);
      router.push('/registration/4');
   };
   return (
      <div className={clsx(s.container, s.stepThree)}>
         <div className={s.header}>
            <CardTitle>Let&apos;s get you set up!</CardTitle>
            <p className={s.cardSubtitle}>Step 3 of 4</p>
         </div>
         <form onSubmit={handleSubmit(onSubmit)} className={s.stepThreeForm}>
            <Controller
               name='profileImage'
               control={control}
               render={({ field: { onChange, value } }) => (
                  <ImageUploader
                     className={s.imageUploader}
                     value={value}
                     onChange={onChange} 
                     onRemove={() => onChange(null)} 
                  />
               )}
            />
            <div className={s.inputContainer}>
               <Input label='Nickname' {...register('nickname')} placeholder='Nickname' error={errors.nickname?.message} />
               <Controller
                  name='accountType'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                     <Select
                        label='Account type'
                        options={accountTypes.map(type => ({
                           label: type.name,
                           value: type.name.replace(/\s+/g, '_'),
                        }))}
                        value={value}
                        onChange={onChange}
                     />
                  )}
               />
            </div>
            <div className={s.buttonsContainer}>
               <Button variant='secondary' type='button' onClick={() => router.replace('/registration/2')}>
                  Back
               </Button>
               <Button type='submit'>Continue</Button>
            </div>
         </form>
      </div>
   );
};
