import React, { useCallback } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { IoReloadOutline } from 'react-icons/io5';

const locales = {
  card_error_title: 'Something went wrong.',
  reload: 'Reload page',
  goBackPage: (page) => `Go to ${page}`,
};

const ErrorCardMessage = (props) => {
  const {
    errorMessage,
    removeErrorAction,
    showBackButton = true,
    backRoute,
    backPageName,
  } = props;
  const history = useHistory();

  const handleBack = useCallback(() => {
    history.push(backRoute);
    removeErrorAction({ error: '' });
  }, [backRoute, history, removeErrorAction]);

  return (
    <Card className="error-message-card">
      <CardHeader>{locales.card_error_title}</CardHeader>
      <CardBody>
        <Row className="basic-row">
          <Col xs={4}>
            <img
              src={process.env.PUBLIC_URL + '/images/nasa-logo.svg'}
              alt="Nasa logo"
              className="error-message-card-img"
            />
          </Col>
          <Col xs={8}>
            <p className="error-message-card-text"> {errorMessage}</p>
          </Col>
        </Row>
      </CardBody>
      <CardFooter>
        <Col
          xs={12}
          sm={12}
          md={showBackButton ? 6 : 12}
          className="error-message-card-button-container"
        >
          <Button
            color=""
            className="error-message-card-button yellow"
            size="lg"
            onClick={() => document.location.reload()}
          >
            <IoReloadOutline style={{ marginRight: '15px' }} />
            {locales.reload}
          </Button>
        </Col>
        {showBackButton && (
          <Col
            xs={12}
            sm={12}
            md={6}
            className="error-message-card-button-container"
          >
            <Button
              color=""
              className="error-message-card-button yellow"
              size="lg"
              onClick={handleBack}
            >
              <FaHome style={{ marginRight: '15px' }} />
              {locales.goBackPage(backPageName)}
            </Button>
          </Col>
        )}
      </CardFooter>
    </Card>
  );
};

export default ErrorCardMessage;
