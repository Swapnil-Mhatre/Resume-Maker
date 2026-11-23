interface EmptyDivProps {
  text: string;
}

function EmptyDiv({ text }: EmptyDivProps) {
  return <div className="empty-div">{text}</div>;
}

export default EmptyDiv;
