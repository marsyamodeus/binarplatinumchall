import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { BiSolidChevronRight } from "react-icons/bi";
import "./breadcrumbs.css";

export default function Breadcrumbs() {
  const location = useLocation();

  let currentLink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index, array) => {
      currentLink += `/${crumb}`;

      const isLastItem = index === array.length - 1;

      return (
        <Breadcrumb.Item
          className="breaditem"
          key={crumb}
          linkAs={Link}
          linkProps={{ to: currentLink }}
        >
          {crumb}
          {!isLastItem && <BiSolidChevronRight className="separator" />}{" "}
          {/* Add the icon as separator */}
        </Breadcrumb.Item>
      );
    });

  return <Breadcrumb className="breadcrumbs">{crumbs}</Breadcrumb>;
}
