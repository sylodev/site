import Link from "next/link";

export interface CardProps {
  link: string;
  title: string;
  description: string;
  footer: string;
}

export const Card: React.FC<CardProps> = (props) => {
  return (
    <Link href={props.link} passHref>
      <a className="flex flex-col justify-between text-left border rounded transition hover:shadow-xl bg-box border-border">
        <div className="p-3">
          <h5 className="text-xl font-bold text-blue-500">{props.title}</h5>
          <p className="pt-2 text-gray">{props.description}</p>
        </div>
        <div className="px-3 py-2 text-sm text-gray bg-background border-t border-border bg-opacity-60 text-light">
          {props.footer}
        </div>
      </a>
    </Link>
  );
};
