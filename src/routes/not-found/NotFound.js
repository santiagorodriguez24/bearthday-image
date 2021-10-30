import React from 'react';
import { ROUTE_HOME } from 'routes/routes';
import { Button, Row, Container } from 'reactstrap';
import { IoHome } from 'react-icons/io5';
import MainLayout from 'components/MainLayout';

const locales = {
  backButtonLabel: 'Go to Home',
  not_found_message: 'The page you are looking for is not available.',
};

const NotFound = (props) => {
  const goToStart = () => {
    props.history.push(ROUTE_HOME);
  };

  return (
    <MainLayout isPublicPage={false}>
      <Container>
        <div className="not-found">
          <Row className="not-found-message">
            <p>{locales.not_found_message}</p>
          </Row>
          <Row className="not-found-row">
            <img
              src={process.env.PUBLIC_URL + '/images/not-found.jpg'}
              alt="Not Found Img"
              className="not-found-img"
            />
          </Row>
          <Row className="not-found-button-container">
            <Button
              color=""
              className="app-button purple"
              size="lg"
              onClick={goToStart}
            >
              <IoHome style={{ marginRight: '15px' }} />
              {locales.backButtonLabel}
            </Button>
          </Row>
        </div>
      </Container>
    </MainLayout>
  );
};

export default NotFound;
