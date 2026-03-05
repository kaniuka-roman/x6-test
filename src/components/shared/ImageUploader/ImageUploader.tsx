'use client';

import React, { useRef, useMemo, ChangeEvent, useState } from 'react';
import s from './ImageUploader.module.scss';
import clsx from 'clsx';
import { Button } from '@/components/ui/Buttons/Button';
import { TrashBasketIcon, UploadIcon } from '@/components/icons/icons';
import Image from 'next/image';

interface ImageUploaderProps {
   value?: File | string | null;
	className?: string;
   onChange: (file: File | null) => void;
   onRemove?: () => void;
   onError?: (error: string) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB у байтах
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export const ImageUploader = ({
   value,
	className,
   onChange,
   onRemove,
   onError,
}: ImageUploaderProps) => {
   const [localError, setLocalError] = useState<string | null>(null);
   const inputRef = useRef<HTMLInputElement>(null);

   const previewUrl = useMemo(() => {
      if (value instanceof File) {
         return URL.createObjectURL(value);
      }
      return value;
   }, [value]);

   const validateFile = (file: File): string | null => {
      if (!ALLOWED_TYPES.includes(file.type)) {
         return 'Only PNG, JPG or JPEG formats are allowed.';
      }
      if (file.size > MAX_FILE_SIZE) {
         return 'File size must be less than 10MB.';
      }
      return null;
   };

   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      setLocalError(null);
      const file = e.target.files?.[0];

      if (file) {
         const error = validateFile(file);

         if (error) {
            setLocalError(error);
            if (onError) onError(error);
            e.target.value = '';
            return;
         }

         onChange(file);
      }
      e.target.value = '';
   };

   const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      setLocalError(null);
      if (onRemove) {
         onRemove();
      } else {
         onChange(null);
      }
   };

   return (
      <div className={clsx(s.uploaderContainer, className)}>
         <input
            type='file'
            ref={inputRef}
            onChange={handleFileChange}
            // Обмежуємо вибір файлів у вікні провідника
            accept='.png, .jpg, .jpeg'
            className={s.hiddenInput}
         />

         <div
            className={clsx(s.dropzone, previewUrl && s.hasImage, localError && s.errorState)}
            onClick={() => inputRef.current?.click()}>
            {previewUrl ? (
               <>
                  <Image src={previewUrl} alt='Preview' className={s.preview} width={95} height={95} />
                  <button type='button' className={s.removeButton} onClick={handleRemove}>
                     <TrashBasketIcon />
                  </button>
               </>
            ) : (
               <div className={s.placeholder} />
            )}
         </div>
			<p className={s.supportText}>We Support PNGs,JPEGs under 10MB</p>


         <Button type='button' variant='secondary' className={s.uploadButton} onClick={() => inputRef.current?.click()}>
				<UploadIcon />
            Upload new photo
         </Button>
      </div>
   );
};
