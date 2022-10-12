export default function MainContent(props: { children: React.ReactNode }) {
  return <div className="px-20 grow">{props.children}</div>;
}
