import Link from "next/link";

export function Box(props: {
  slot: React.ReactNode;
  size?: "small" | "medium";
}) {
  return (
    <div className={`box box--${props.size || "medium"}`}>{props.slot}</div>
  );
}

export function RichText(props: { richText: string }) {
  return (
    <div
      className="rich-text"
      dangerouslySetInnerHTML={{ __html: props.richText }}
    />
  );
}

export function AppLink(props: { href: string; label: string }) {
  return (
    <Link href={props.href}>
      <a>{props.label}</a>
    </Link>
  );
}
