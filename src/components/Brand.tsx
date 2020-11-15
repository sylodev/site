import styles from "../styles/Brand.module.css";

interface Event {
  title: string;
  active_override?: boolean;
  start_date: Date;
  end_date: Date;
  className?: string;
}

const CURRENT_YEAR = new Date().getFullYear();
// Feel free to submit a PR for more events or improve existing ones because I kinda half assed some of them
const Events: Event[] = [
  {
    title: `Pride Month ${CURRENT_YEAR} 🌈`,
    start_date: new Date(`June ${CURRENT_YEAR}`),
    end_date: new Date(`July ${CURRENT_YEAR}`),
    className: styles.prideMonth,
  },
  {
    title: "Bisexual Awareness Week",
    start_date: new Date(`16 September ${CURRENT_YEAR}`),
    end_date: new Date(`24 September ${CURRENT_YEAR}`),
    className: styles.biAwareness,
  },
  {
    title: "Happy Halloween 👻",
    start_date: new Date(`October ${CURRENT_YEAR}`),
    end_date: new Date(`November ${CURRENT_YEAR}`),
    className: styles.halloween,
  },
  {
    title: "Transgender Awareness Week",
    start_date: new Date(`13 November ${CURRENT_YEAR}`),
    end_date: new Date(`20 November ${CURRENT_YEAR}`),
    className: styles.transAwareness,
  },
];

function getActiveEvent(): Event | undefined {
  const now = new Date().getTime();
  for (const event of Events) {
    if (event.active_override) return event;
    if (event.start_date.getTime() > now) continue;
    if (event.end_date.getTime() < now) continue;
    return event;
  }
}

export default function Brand() {
  const event = getActiveEvent();
  const className = event ? `${styles.brand} ${event.className}` : styles.brand;
  return (
    <h1 className={className} title={event?.title}>
      sylo.digital
    </h1>
  );
}
