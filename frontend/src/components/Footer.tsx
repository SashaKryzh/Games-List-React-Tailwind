export default function Footer() {
  return (
    <footer className="flex bg-slate-800 p-4 mt-4 bottom-0 left-0 right-0 justify-center">
      <div className="flex space-x-6">
        <GitHubLink text="@sashakryzh" url="https://github.com/SashaKryzh"/>
        <GitHubLink text="@denitdao" url="https://github.com/denitdao" />
      </div>
    </footer>
  );
}

function GitHubLink(props: { text: string, url: string }) {
  return (
    <a className="text-slate-300 font-mono" href={props.url}>
      {props.text}
    </a>
  );
}
