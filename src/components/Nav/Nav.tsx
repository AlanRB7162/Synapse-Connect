//src/components/Nav/Nav.tsx

import {
  Breadcrumb,
  Flex,
} from "@chakra-ui/react";
import './Nav.css';
import { NavPopover } from "../Popover/NavPopover/NavPopover";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

export function Nav() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Flex as="nav" pl={3} pr={5} py={1} pt={5} align="center" gap={4} className="nav">
      <NavPopover />
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link asChild>
              <RouterLink to="/">Início</RouterLink>
            </Breadcrumb.Link>
          </Breadcrumb.Item>

          {pathnames.map((segment, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return (
              <Fragment key={to}>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  {isLast ? (
                    <Breadcrumb.Link asChild>
                      <span aria-current="page" className="nav-page">{formatLabel(segment)}</span>
                    </Breadcrumb.Link>
                  ) : (
                    <Breadcrumb.Link asChild>
                      <RouterLink to={to}>{formatLabel(segment)}</RouterLink>
                    </Breadcrumb.Link>
                  )}
                </Breadcrumb.Item>
              </Fragment>
            );
          })}
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </Flex>
  );
}

function formatLabel(segment: string) {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

