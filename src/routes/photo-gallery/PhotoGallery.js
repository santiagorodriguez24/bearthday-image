import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { FaHome } from 'react-icons/fa';
import { Row, Container, Button } from 'reactstrap';

import { url_nasa_epic_api } from 'api-interface/urls';

import { changeNasaProps } from 'store/action-creators/NasaEpicActions';
import MainLayout from 'components/MainLayout';
import ErrorMessageCard from 'components/ErrorMessageCard';
import { DATE_FORMATS } from 'config/DayJs/time-date';

import { ROUTE_HOME } from 'routes/routes';

const urlArchiveNaturalColor = `${url_nasa_epic_api}/archive/natural`;
let api_key = process.env.REACT_APP_NASA_API_KEY;

const locales = {
  backButtonLabel: 'Go to Home',
  page_title: 'Photo Gallery',
  getDescription: (birthday, imagesDate) => {
    if (birthday === imagesDate) {
      return `This are the photos of the earth on your last birthday!`;
    } else {
      return `Sadly, NASA doesn’t take photos every day and they didn’t take a picture of the earth on your last birthday, so the next images are from the closest date after: (${imagesDate}).`;
    }
  },
  emptyState:
    'Go back to Home screen and select a date to see the photos of the earth on that day.',
};

function PhotoGallery() {
  const nasaEpicImagesByDateDataStore = useSelector(
    (store) => store.nasaEpic.imagesByDateData,
  );

  const userBirthDayStore = useSelector((store) => store.nasaEpic.userBirthDay);

  const imagesDateStore = useSelector((store) => store.nasaEpic.imagesDate);

  const nasaEpicErrorStore = useSelector((store) => store.nasaEpic.error);

  const images = useMemo(() => {
    if (nasaEpicErrorStore !== '') {
      return (
        <ErrorMessageCard
          errorMessage={nasaEpicErrorStore}
          removeErrorAction={changeNasaProps}
          showBackButton
          backPageName={'Home'}
        />
      );
    }

    if (nasaEpicImagesByDateDataStore.length) {
      const carouselItems = nasaEpicImagesByDateDataStore.map(
        (element, index) => {
          const { caption, image, date } = element;

          const imageDate = dayjs(date);

          const imageYear = imageDate.format(DATE_FORMATS.YEAR_FOUR_DIGIT);
          const imageMonth = imageDate.format(
            DATE_FORMATS.MONTH_NAME_TWO_DIGITS,
          );
          const imageDay = imageDate.format(DATE_FORMATS.DAY_NAME_TWO_DIGITS);
          const src = `${urlArchiveNaturalColor}/${imageYear}/${imageMonth}/${imageDay}/png/${image}.png?api_key=${api_key}`;

          return (
            <div key={`carousel-item-${index}`}>
              <img src={src} alt={caption} />
              <p className="legend">{caption}</p>
            </div>
          );
        },
      );

      return (
        <Carousel autoPlay infiniteLoop>
          {carouselItems}
        </Carousel>
      );
    }

    return (
      <>
        <Row className="photo-gallery-description empty">
          <p>{locales.emptyState}</p>
        </Row>
        <Row className="basic-row">
          <Button
            color=""
            className="app-button purple"
            size="lg"
            tag={Link}
            to={ROUTE_HOME}
          >
            <FaHome style={{ marginRight: '15px' }} />
            {locales.backButtonLabel}
          </Button>
        </Row>
      </>
    );
  }, [nasaEpicErrorStore, nasaEpicImagesByDateDataStore]);

  return (
    <MainLayout isPublicPage={false}>
      <Container>
        <div className="page-title">{locales.page_title}</div>
        {imagesDateStore && userBirthDayStore ? (
          <Row className="photo-gallery-description">
            <p>{locales.getDescription(userBirthDayStore, imagesDateStore)}</p>
          </Row>
        ) : null}
        <Row className="basic-row">{images}</Row>
      </Container>
    </MainLayout>
  );
}

export default PhotoGallery;
