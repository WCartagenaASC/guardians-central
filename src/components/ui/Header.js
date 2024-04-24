import React from "react"
import {LinkContainer} from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import img from '../../assets/images/logo192.png'
import './Header.scss'

const Header = () => {
    
    return (
        <Navbar variant='dark' bg="dark" expand="lg">
        <Container className="gc-navbar">
          <LinkContainer to="/">
            <Navbar.Brand>            
            <img
              alt=""
              src={img}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}Guardians Central</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/*<Nav>
                <ul className="navbar-nav mb-2 mb-lg-0 ">
                    <li className="nav-item">
                        <Link className="text-decoration-none px-2" to="vanguard">Vanguard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="text-decoration-none px-2" to="crucible">Crucible</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="text-decoration-none px-2" to="gambit">Gambit</Link>
                    </li>
                </ul>
    </Nav>*/}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      );
    
};

export default Header