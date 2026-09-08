type Props = {
  kicker?: string;
  title: string;
  sub?: string;
};

export default function SectionTitle({ kicker, title, sub }: Props) {
  return (
    <div className="section-title">
      {kicker ? <span className="kicker">{kicker}</span> : null}
      <h2>{title}</h2>
      {sub ? <p className="section-sub">{sub}</p> : null}
    </div>
  );
}
