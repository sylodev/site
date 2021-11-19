import classNames from "classnames";
import style from "./brand.module.css";

interface Event {
  title: string;
  start_date: Date;
  end_date: Date;
  className?: string;
}

const CURRENT_YEAR = new Date().getFullYear();
const EVENTS: Event[] = [
  {
    title: `Pride Month ${CURRENT_YEAR} 🌈`,
    start_date: new Date(`June ${CURRENT_YEAR}`),
    end_date: new Date(`July ${CURRENT_YEAR}`),
    className: style.prideMonth,
  },
  {
    title: "Bisexual Awareness Week",
    start_date: new Date(`16 September ${CURRENT_YEAR}`),
    end_date: new Date(`24 September ${CURRENT_YEAR}`),
    className: style.biAwareness,
  },
  {
    title: "Happy Halloween 👻",
    start_date: new Date(`October ${CURRENT_YEAR}`),
    end_date: new Date(`November ${CURRENT_YEAR}`),
    className: style.halloween,
  },
  {
    title: "Transgender Awareness Week",
    start_date: new Date(`13 November ${CURRENT_YEAR}`),
    end_date: new Date(`20 November ${CURRENT_YEAR}`),
    className: style.transAwareness,
  },
];

function getActiveEvent(): Event | undefined {
  const now = new Date().getTime();
  for (const event of EVENTS) {
    if (event.start_date.getTime() > now) continue;
    if (event.end_date.getTime() < now) continue;
    return event;
  }
}

export default function Brand() {
  const event = getActiveEvent();
  const classes = classNames(event ? "text-transparent bg-clip-text" : "text-white", event?.className);
  return (
    <h1 className="pb-4 text-6xl font-bold text-white" title={event?.title}>
      <span className={classes}>sylo.digital</span>
    </h1>
  );
}
