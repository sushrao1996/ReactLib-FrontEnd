import React, { useState } from "react";
import {
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};
const Menu = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color="dark" dark expand="md" className="nav-tabs">
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={Link} style={currentTab(history, "/")} to="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} style={currentTab(history, "/cart")} to="/cart">
              Cart
            </NavLink>
          </NavItem>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <>
              <NavItem>
                <NavLink
                  tag={Link}
                  style={currentTab(history, "/user/dashboard")}
                  to="/user/dashboard"
                >
                  UserDashboard
                </NavLink>
              </NavItem>
            </>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <>
              <NavItem>
                <NavLink
                  tag={Link}
                  to="/admin/dashboard"
                  style={currentTab(history, "/admin/dashboard")}
                >
                  AdminDashboard
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
        <Nav className="ml-auto" navbar>
          {!isAuthenticated() && (
            <>
              <NavItem>
                <NavLink
                  tag={Link}
                  style={currentTab(history, "/signup")}
                  to="/signup"
                >
                  SignUp
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  style={currentTab(history, "/signin")}
                  to="/signin"
                >
                  SignIn
                </NavLink>
              </NavItem>
            </>
          )}
          {isAuthenticated() && (
            <NavItem>
              <NavLink
                className="text-white"
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Signout
              </NavLink>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default withRouter(Menu);
