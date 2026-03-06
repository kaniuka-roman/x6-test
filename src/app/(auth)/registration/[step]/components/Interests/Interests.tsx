import clsx from 'clsx';
import s from './Interests.module.scss';

type Interest = {
   label: string;
   value: string;
};
type InterestsProps = {
   interests: Interest[];
   className?: string;
   selectedInterests: string[];
   onSelect: (interest: string) => void;
};
export const Interests = ({
   interests,
   selectedInterests,
   className,
   onSelect,
}: InterestsProps) => {
   return (
      <div className={clsx(s.container, className)}>
         <div className={s.interestsText}>
            <p className={s.interestsTitle}>Choose your insterests</p>
            <p className={s.interestsSubtitle}>Get better recommendations</p>
         </div>
         <div className={s.interests}>
            {interests.map(interest => (
               <button
                  key={interest.value}
                  onClick={() => onSelect(interest.value)}
                  className={clsx(
                     s.interest,
                     selectedInterests.includes(interest.value) && s.selected,
                  )}>
                  {interest.label}
               </button>
            ))}
         </div>
      </div>
   );
};
