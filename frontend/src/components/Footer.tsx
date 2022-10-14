export default function Footer() {
  return (
    <footer className="flex border-t dark:border-t-0 bg-gray-50 dark:bg-slate-800 p-4 bottom-0 left-0 right-0 justify-center">
      <div className="flex space-x-6">
        <GitHubLink text="@sashakryzh" url="https://github.com/SashaKryzh" />
        <GitHubLink text="@denitdao" url="https://github.com/denitdao" />
      </div>
    </footer>
  );
}

function GitHubLink(props: { text: string; url: string }) {
  return (
    <a
      className="text-slate-400 dark:text-slate-300 hover:underline font-mono"
      href={props.url}
    >
      {props.text}
    </a>
  );
}
