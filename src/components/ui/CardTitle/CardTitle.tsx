import s from './CardTitle.module.scss';

export const CardTitle = ({ children }: { children: React.ReactNode }) => {
	return <h2 className={s.cardTitle}>{children}</h2>
};