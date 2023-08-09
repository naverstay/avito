import Plate from 'components/UI/Plate/Plate';
import {TextInput} from 'components/UI/TextInput/TextInput';
import './InteractivePlateStep.scss';
import FAQ from 'components/UI/FAQ/FAQ';
import SelectInput from '../SelectInput/SelectInput';
import {Phrase} from '../Phrase/Phrase';
import Button from 'components/UI/Button/Button';
import MainStore from 'stores/MainStore';
import {observer} from 'mobx-react';
import {useCallback, useEffect, useMemo, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import getCookie from 'utils/getCookie';

export const InteractivePlateStep1 = observer(() => {
  const refPlate = useRef();

  const plateStyle = {
    width: '100%',
    display: 'grid',
    gap: '40px 52px',
    paddingTop: '12px',
    gridTemplateColumns: '1fr 1fr'
  };

  const countryStyle = {marginTop: 16};
  const cityStyle = {marginTop: 26, marginBottom: 20};

  // Для FAQ
  const categoryfaqstyle = {
    marginLeft: 'auto'
  };
  const categoryfaqtext = "Укажите категорию в которой находится ваше объявление, так его будет легче найти.";
  const searchPhrasesfaqtext = "Укажите до четырех поисковых фраз, по которым вы хотите получить больше активностей. Больше четырех фраз нельзя добавить, так как может быть переспам объявления, что негативно скажется на позициях.";
  const cityfaqtext = "На одно объявление можно выбрать один город. Город должен совпадать с городом указанным в объявлении Авито.";

  // Стили кнопки "создать"
  const buttonStyle = {
    margin: 'auto auto 0'
  };

  // Запись созданного проекта на сервер
  const navigate = useNavigate();

  const gotoStep2 = useCallback(() => {

    // Не прошли валидацию
    if (!MainStore.checkStep1()) {
      return;
    }

    // Пользователь незарегистрирован
    if (!getCookie('jwt')) {
      return navigate('/login');
    }

    if (refPlate?.current) {
      window.scroll(0, refPlate.current.offsetTop + refPlate.current.offsetHeight);
    }
  }, [refPlate?.current]);

  function createProject() {

    // Не прошли валидацию
    if (!MainStore.checkValidation()) {
      return;
    }

    // Пользователь незарегистрирован
    if (!getCookie('jwt')) {
      return navigate('/login');
    }

    const projectData = {
      title: `Активность в Авито (№${Math.round(100000 + Math.random() * 899999)})`,
      linkToAvitoAd: MainStore.linkToAvitoAd,
      category: MainStore.category,
      searchPhrases: MainStore.searchPhrases,
      country: MainStore.country,
      city: MainStore.city,
      activityQuantity: MainStore.calculations.activityQuantity,
      activityFavourites: MainStore.calculations.activityFavourites,
      activityMessages: MainStore.calculations.activityMessages,
      activitySubscribe: MainStore.calculations.activitySubscribe,
      activityPrice: MainStore.calculations.activityPrice,
      totalPrice: MainStore.calculations.totalPrice,

      reportsPriceIsActive: MainStore.calculations.reportsPriceIsActive,
      monitoringPriceIsActive: MainStore.calculations.monitoringPriceIsActive,
      seeNumberPriceIsActive: MainStore.calculations.seeNumberPriceIsActive,
      seePhotoPriceIsActive: MainStore.calculations.seePhotoPriceIsActive,
      showMapPriceIsActive: MainStore.calculations.showMapPriceIsActive,
      feedbackQuantity: MainStore.calculations.feedbackQuantity,

      state: 'Ждёт оплаты'
    };

    // Локальное хранилище cookie
    // const projects = getCookie('projects') ? JSON.parse(getCookie('projects')) : [];
    // projects.push(projectData);
    // document.cookie = `projects=${JSON.stringify(projects)};path=/;max-age=31536000`;
    // MainStore.reset();
    // navigate('/projects');

    // Серверное хранилище
    fetch(process.env.REACT_APP_BACKEND_ADDRESS + '/projects', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + getCookie('jwt'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(projectData)
    })
      .then(res => {
        if (res.ok) {
          console.log(res);
          MainStore.reset();
          navigate('/projects');
        } else {
          throw new Error('Не удалось записать проект');
        }
      })
      .catch(e => console.log(e));

  }

  useEffect(() => {
    MainStore.reset();
  }, []);

  // Обработчики ввода
  function setLinkToAvitoAd(e) {
    MainStore.setLinkToAvitoAd(e.target.value);
  }

  function setCountry(e) {
    // Меняем только для категории Недвижимость
    if (MainStore.category === 'Недвижимость') {
      MainStore.setCountry(e.target.value);
    }
  }

  function setCity(e) {
    MainStore.setCity(e.target.value);
  }

  return (
    <div ref={refPlate} style={plateStyle}>
      <div className="formstep__col">
        <TextInput placeholder="Cсылка на объявление Авито, которое планируете продвигать"
                   value={MainStore.linkToAvitoAd}
                   onChange={setLinkToAvitoAd} errortext={MainStore.linkToAvitoAdError}/>

        <div className="formstep__item">
          <div className="formstep__item-title">
            В какой категории надо продвинуть поисковую фразу?
            <FAQ style={categoryfaqstyle} text={categoryfaqtext}/>
          </div>

          <SelectInput errortext={MainStore.categoryError}/>
        </div>
      </div>

      <div className="formstep__col">
        <div className="formstep__item">
          <div className="formstep__item-title">
            В каком городе надо продвинуть поисковую фразу?
            <FAQ style={categoryfaqstyle} text={cityfaqtext}/>
          </div>

          <TextInput placeholder="Укажите страну" value={MainStore.country} onChange={setCountry} style={countryStyle}
                     errortext={MainStore.countryError}/>
          <TextInput placeholder="Укажите город" value={MainStore.city} onChange={setCity} style={cityStyle}
                     errortext={MainStore.cityError}/>
        </div>
      </div>
      <div className="formstep__control">
        <Button
          style={buttonStyle}
          onClick={gotoStep2}
          title={'К следующему шагу'}
          classes={['']}
          disabled={MainStore.createProjectButtonIsDisable}
        />
      </div>
    </div>
  );
});
