import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { ROUTE_HOME } from 'routes/routes';

const PublicNavBar = () => {
  let history = useHistory();

  return (
    <div>
      <Navbar className="navbar-app" expand="md">
        <NavbarBrand>
          <img
            src={process.env.PUBLIC_URL + '/images/nasa-logo.svg'}
            alt="PL Logo"
            className="navbar-logo link"
            onClick={() => history.push(ROUTE_HOME)}
          />
        </NavbarBrand>
      </Navbar>
    </div>
  );
};

export default PublicNavBar;
