import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

export default function Breadcrubms() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div>
      {breadcrumbs.map(({ match, breadcrumb }, i) => (
        <NavLink key={i} to={match.pathname}>
          {breadcrumb}
          {i < breadcrumbs.length - 1 ? " / " : null}
        </NavLink>
      ))}
    </div>
  );
}
