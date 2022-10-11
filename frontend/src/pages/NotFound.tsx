import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl font-bold">Page not found</p>
      <Link to="/" className="text-xl font-bold underline">
        Go home
      </Link>
    </div>
  );
}
