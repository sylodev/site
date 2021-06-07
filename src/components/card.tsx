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
      <a className="flex flex-col justify-between text-left border border-transparent rounded hover:shadow-xl bg-box hover:border-border">
        <div className="p-4">
          <p className="text-xl font-bold text-blue-500">{props.title}</p>
          <p className="pt-2">{props.description}</p>
        </div>
        <div className="p-4 text-sm bg-black bg-opacity-60 text-light">{props.footer}</div>
      </a>
    </Link>
  );
};
