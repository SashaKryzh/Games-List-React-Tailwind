import React from "react";
import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

export default function Breadcrubms() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <React.Fragment>
      {breadcrumbs.map(({ match, breadcrumb }, i) => (
        <NavLink to={match.pathname}>
          {breadcrumb}
          {i < breadcrumbs.length - 1 ? " / " : null}
        </NavLink>
      ))}
    </React.Fragment>
  );
}
