import clsx from 'clsx';
import s from './PasswordStrengthIndicator.module.scss';
import {
   PasswordDoesntPassValidation,
   PasswordPassValidation,
} from '@/components/icons/icons';

type PasswordStrengthIndicatorProps = {
   rules: {
      label: string;
      met: boolean;
   }[];
   className?: string;
	isShow?: boolean
};

export const PasswordStrengthIndicator = ({
   rules,
   className,
	isShow
}: PasswordStrengthIndicatorProps) => {
   return (
      <div className={clsx(s.container, isShow && s.show, className)}>
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
