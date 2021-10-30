import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';

import {
  Button,
  Container,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

import { FaPhotoVideo } from 'react-icons/fa';

import {
  changeNasaProps,
  getAvailableDates,
  getDataByDate,
} from 'store/action-creators/NasaEpicActions';

import AppLoader from 'components/AppLoader';
import ErrorMessageCard from 'components/ErrorMessageCard';
import MainLayout from 'components/MainLayout';

import { DATE_FORMATS } from 'config/DayJs/time-date';

import { ROUTE_PHOTO_GALLERY } from 'routes/routes';

const locales = {
  searchImagesButtonLabel: 'Search Images',
  page_title: 'Bearthday image',
  description:
    'Your birthday is so special NASA might have taken a photo of you on it! well ok they took a photo of the earth... you may be in it... somewhere.',
  instructions:
    'Select your date of birth and let us show you photos of the earth from the day of your last birthday.',
};

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [selectedDate, setSelectedDate] = useState('');
  const [inputError, setInputError] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);

  const nasaEpicavailableDatesStore = useSelector(
    (store) => store.nasaEpic.availableDates,
  );

  const nasaEpicErrorStore = useSelector((store) => store.nasaEpic.error);

  useEffect(() => {
    dispatch(getAvailableDates())
      .then((result) => {
        setDataLoaded(true);
      })
      .catch((error) => {
        setDataLoaded(true);
      });
  }, [dispatch]);

  const handleOnChangeDate = useCallback((event) => {
    setSelectedDate(event.target.value);
    setInputError('');
  }, []);

  const validateValue = useCallback(() => {
    if (!selectedDate) {
      setInputError('Date of birth is required.');
    }
  }, [selectedDate]);

  const handleSearchImages = useCallback(() => {
    if (selectedDate) {
      const actualDate = dayjs();
      const birthday = dayjs(
        selectedDate,
        DATE_FORMATS.YEAR_FOUR_DIGIT_MONTH_DAY_PADDED,
      );

      const actualYear = actualDate.year();
      const actualMonth = actualDate.month();
      const actualDay = actualDate.date();
      const birthdayMonth = birthday.month();
      const birthdayDay = birthday.date();

      const birthdayAlreadyPassed =
        actualMonth > birthdayMonth
          ? true
          : actualMonth === birthdayMonth
          ? actualDay > birthdayDay
          : false;

      const searchYear = birthdayAlreadyPassed ? actualYear : actualYear - 1;
      const searchMonth = birthday.format(DATE_FORMATS.MONTH_NAME_TWO_DIGITS);
      const searchDay = birthday.format(DATE_FORMATS.DAY_NAME_TWO_DIGITS);

      const searchDateString = `${searchYear}-${searchMonth}-${searchDay}`;
      let finalSearchDate = '';

      if (nasaEpicavailableDatesStore) {
        const lastBirthdayImageAvailable =
          nasaEpicavailableDatesStore.includes(searchDateString);

        if (lastBirthdayImageAvailable) {
          finalSearchDate = searchDateString;
        } else {
          const searchDate = dayjs(
            searchDateString,
            DATE_FORMATS.YEAR_FOUR_DIGIT_MONTH_DAY_PADDED,
          );

          let daysToAdd = 1;

          while (!finalSearchDate) {
            const dateToFind = searchDate
              .add(daysToAdd, 'day')
              .format(DATE_FORMATS.YEAR_FOUR_DIGIT_MONTH_DAY_PADDED);

            const dateIsAvailable =
              nasaEpicavailableDatesStore.includes(dateToFind);

            if (dateIsAvailable) {
              finalSearchDate = dateToFind;
            }

            daysToAdd++;
          }
        }
      }

      setDataLoaded(false);

      dispatch(
        changeNasaProps({
          userBirthDay: selectedDate,
          imagesDate: finalSearchDate,
        }),
      );

      dispatch(getDataByDate(finalSearchDate))
        .then((result) => {
          history.push(ROUTE_PHOTO_GALLERY);
          setDataLoaded(true);
        })
        .catch((error) => {
          setDataLoaded(true);
          console.log('Component error: ', error);
        });
    }
  }, [dispatch, history, nasaEpicavailableDatesStore, selectedDate]);

  const ErrorCard = useMemo(() => {
    if (nasaEpicErrorStore !== '') {
      return (
        <ErrorMessageCard
          errorMessage={nasaEpicErrorStore}
          removeErrorAction={changeNasaProps}
          showBackButton={false}
        />
      );
    }

    return null;
  }, [nasaEpicErrorStore]);

  return (
    <MainLayout isPublicPage={false}>
      <Container>
        <div className="page-title">{locales.page_title}</div>
        <Row className="home-description">
          <p>{locales.description}</p>
        </Row>
        <Row className="home-description">
          <p>{locales.instructions}</p>
        </Row>
        {dataLoaded ? (
          <div className="form-container">
            <FormGroup className="app-input-container">
              <Label className="app-input-label" for={'birthday-input'}>
                {'Date of birth'}
              </Label>
              <Input
                id={'birthday-input'}
                placeholder="&#xf1fd;;   Birthday"
                type="date"
                invalid={!!inputError}
                className="app-input"
                onChange={handleOnChangeDate}
                onBlur={validateValue}
                value={selectedDate}
              />
              {!!inputError && (
                <FormFeedback className="app-formfeedback">
                  {inputError}
                </FormFeedback>
              )}
            </FormGroup>
            <Row className="home-button-container">
              <Button
                color=""
                className="app-button"
                size="lg"
                disabled={!!inputError || !selectedDate}
                onClick={handleSearchImages}
              >
                <FaPhotoVideo size={20} style={{ marginRight: '15px' }} />
                {locales.searchImagesButtonLabel}
              </Button>
            </Row>
            <Row className="home-button-container">{ErrorCard}</Row>
          </div>
        ) : (
          <AppLoader />
        )}
      </Container>
    </MainLayout>
  );
}

export default Home;
