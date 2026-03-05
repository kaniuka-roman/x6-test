import clsx from 'clsx';
import s from './PasswordStrengthIndicator.module.scss';
import {
   PasswordDoesntPassValidation,
   PasswordPassValidation,
   WarningIcon,
} from '@/components/icons/icons';

type PasswordStrengthIndicatorProps = {
   isPasswordsMatch: boolean;
   rules: {
      label: string;
      met: boolean;
   }[];
   className?: string;
};

export const PasswordStrengthIndicator = ({
   isPasswordsMatch,
   rules,
   className,
}: PasswordStrengthIndicatorProps) => {
   const allChecksMet = rules.every(check => check.met);
   return (
      <div className={clsx(s.container, className)}>
         {(!allChecksMet || !isPasswordsMatch) && (
            <div className={s.warning}>
               <WarningIcon />
               <p>
                  {!allChecksMet
                     ? 'Password too weak'
                     : !isPasswordsMatch
                       ? 'Passwords do not match'
                       : ''}
               </p>
            </div>
         )}
         <div className={s.strengthIndicator}>
            {rules.map((check, index) => (
               <div key={index} className={clsx(s.ruleItem, check.met ? s.ruleMet : s.ruleNotMet)}>
                  {check.met ? <PasswordPassValidation /> : <PasswordDoesntPassValidation />}{' '}
                  <span className={s.ruleText}>{check.label}</span>
               </div>
            ))}
         </div>
      </div>
   );
};
