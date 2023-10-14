import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Website Status Checker</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={{paddingRight: 15}}>
            Twitter: <a href="https://twitter.com/jayadky">jayadky</a>
          </Navbar.Text>
          {" /  / "}
          <Navbar.Text>
            GitHub:{" "}
            <a href="https://github.com/jayantaadhikary">jayantaadhikary</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
