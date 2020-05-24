import React, { useContext } from "react";
import { Flex, Button, Box, NavLink } from "theme-ui";
import { IdentityContext } from "../context/identity-context";
import { Link } from "gatsby";

const Header = () => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <Flex sx={{ alignItems: "center" }} as="nav">
          <NavLink as={Link} to={"/"} p={2}>
            Home
          </NavLink>
          <NavLink as={Link} to={"/app"} p={2}>
            Dashboard
          </NavLink>
          {!user ? (
            <Button
              sx={{ backgroundColor: "transparent", color: "white" }}
              onClick={() => netlifyIdentity.open()}
            >
              Log in
            </Button>
          ) : (
            <Flex>
              <Button
                sx={{ backgroundColor: "transparent", color: "white" }}
                onClick={() => netlifyIdentity.logout()}
              >
                Log out
              </Button>
              <span sx={{ p: 2 }}>{user.user_metadata.full_name}</span>
            </Flex>
          )}
        </Flex>
      </div>
    </header>
  );
};

export default Header;
