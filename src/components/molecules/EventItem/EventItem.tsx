import styles from './EventItem.module.css';

export interface EventItemProps {
  weekday: string;
  day: string;
  title: string;
  subtitle: string;
}

export function EventItem({ weekday, day, title, subtitle }: EventItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.date} aria-label={`${weekday} ${day}`}>
        <span className={styles.dow}>{weekday}</span>
        <span className={styles.day}>{day}</span>
      </div>
      <div className={styles.body}>
        <span className={styles.title}>{title}</span>
        <span className={styles.sub}>{subtitle}</span>
      </div>
    </div>
  );
}
