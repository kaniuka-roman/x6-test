'use client';

import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';
import s from './Input.module.scss';
import clsx from 'clsx';

function InputOTP({
   className,
   containerClassName,
   ...props
}: React.ComponentProps<typeof OTPInput> & {
   containerClassName?: string;
}) {
   return (
      <OTPInput
         containerClassName={clsx(s.inputOTPContainer, containerClassName)}
         className={clsx(s.inputOTP, className)}
         {...props}
      />
   );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
   return (
      <div className={clsx(s.inputOTPGroup, className)} {...props} />
   );
}

function InputOTPSlot({
   index,
   className,
   ...props
}: React.ComponentProps<'div'> & {
   index: number;
}) {
   const inputOTPContext = React.useContext(OTPInputContext);
   const slot = inputOTPContext?.slots[index];

   if (!slot) return null;

   const { char, hasFakeCaret, isActive } = slot;

   return (
      <div
         data-active={isActive}
         className={clsx(s.inputOTPSlot, char && s.fill, className)}
         {...props}
      >
         {char}
         {hasFakeCaret && (
            <div className={s.caretContainer}>
               <div className={s.caret} />
            </div>
         )}
      </div>
   );
}

export { InputOTP, InputOTPGroup, InputOTPSlot };