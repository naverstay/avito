import Plate from 'components/UI/Plate/Plate';
import {TextInput} from 'components/UI/TextInput/TextInput';
import './InteractivePlateStep.scss';
import FAQ from 'components/UI/FAQ/FAQ';
import SelectInput from '../SelectInput/SelectInput';
import {Phrase} from '../Phrase/Phrase';
import Button from 'components/UI/Button/Button';
import MainStore from 'stores/MainStore';
import {observer} from 'mobx-react';
import {useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import getCookie from 'utils/getCookie';
import InteractiveTDB from "../InteractiveTDB/InteractiveTDB";
import hearticon from "../../../../assets/images/hearticon.svg";
import humanicon from "../../../../assets/images/humanicon.svg";
import staricon from "../../../../assets/images/staricon.svg";
import {InteractiveMB} from "../../../InteractiveMB/InteractiveMB";
import InteractiveToggler from "../InteractiveToggler/InteractiveToggler";
import {TotalPrice} from "../../../TotalPrice/TotalPrice";

export const InteractivePlateStep2 = observer(() => {
  const plateStyle = {
    width: '100%',
    display: 'grid',
    gap: '40px 52px',
    paddingTop: '12px',
    gridTemplateColumns: '1fr 1fr'
  };

  const countryStyle = {marginTop: 16};
  const cityStyle = {marginTop: 16, marginBottom: 30};

  // Для FAQ
  const categoryfaqstyle = {
    marginLeft: 'auto'
  };
  const categoryfaqtext = "Укажите категорию в которой находится ваше объявление, так его будет легче найти.";
  const searchPhrasesfaqtext = "Укажите до четырех поисковых фраз, по которым вы хотите получить больше активностей. Больше четырех фраз нельзя добавить, так как может быть переспам объявления, что негативно скажется на позициях.";
  const cityfaqtext = "На одно объявление можно выбрать один город. Город должен совпадать с городом указанным в объявлении Авито.";

  // Стили кнопки "создать"
  const buttonStyle = {
    margin: '0',
    padding: '0 55px'
  };

  // Запись созданного проекта на сервер
  const navigate = useNavigate();

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
    <div style={plateStyle}>
      <div className="formstep__col">
        <div className="formstep__item">
          <div className="formstep__item-title">
            Какую поисковую фразу надо продвинуть в Авито?
          </div>

          <Phrase/>
        </div>

        <div className="interactiveMB__holder">
          <div className="interactiveMB__container">
            <InteractiveMB
              title="Стоимость активности"
              min={MainStore.calculations.minActivityPrice}
              max={MainStore.calculations.maxActivityPrice}
              minBar={MainStore.calculations.activityQuantityMin}
              maxBar={MainStore.calculations.activityQuantityMax}
              currency="₽"
              firstTextCurrency="₽"
              firstpreprice="от "
              secondpreprice="до "
              price={MainStore.calculations.activityPrice}
              pieces={MainStore.calculations.activityQuantity}
              secondTextCurrency="действий"
              handler={MainStore.calculations.setActivityQuantity}
              value={MainStore.calculations.activityQuantity}
            />
          </div>

          <InteractiveToggler
            title="Посмотреть номер (без звонка)"
            isActive={MainStore.calculations.seeNumberPriceIsActive}
            price={MainStore.calculations.SEE_NUMBER_PRICE}
            handler={MainStore.calculations.switchSeeNumberPriceIsActive}
          />
          <InteractiveToggler
            title="Просмотреть все фото дольше конкурентов"
            isActive={MainStore.calculations.seePhotoPriceIsActive}
            price={MainStore.calculations.SEE_PHOTO_PRICE}
            handler={MainStore.calculations.switchSeePhotoPriceIsActive}
          />
          <InteractiveToggler
            title="Нажать показать на карте"
            isActive={MainStore.calculations.showMapPriceIsActive}
            price={MainStore.calculations.SHOW_MAP_PRICE}
            handler={MainStore.calculations.switchShowMapPriceIsActive}
          />

          <InteractiveMB
            className={"interactiveMB__reviews"}
            title="Отзывы"
            min={0}
            max={3}
            price={MainStore.calculations.feedbackTotalPrice}
            pieces={MainStore.calculations.feedbackQuantity}
            handler={MainStore.calculations.setFeedbackQuantity}
            firstTextCurrency="₽"
            secondTextCurrency="шт."
            value={MainStore.calculations.feedbackQuantity}
          />
        </div>
      </div>

      <div className="formstep__col __interactive">
        <InteractiveTDB
          title="Видимость по запросам"
          digit={MainStore.calculations.vision}
          digitafter="%"
          info=""
          barWidth={MainStore.calculations.vision}
        />
        <InteractiveTDB
          title="Активность в избранное"
          digit={MainStore.calculations.activityFavourites}
          icon={hearticon}
          info=""
          barWidth={MainStore.calculations.barFavouritesWidth}
        />
        <InteractiveTDB
          title="Активность контакты чат"
          digit={MainStore.calculations.activityMessages}
          icon={humanicon}
          info=""
          barWidth={MainStore.calculations.barMessagesWidth}
        />
        <InteractiveTDB
          title="Подписаться на продавца"
          digit={MainStore.calculations.activitySubscribe}
          icon={staricon}
          info=""
          barWidth={MainStore.calculations.barSubscribeWidth}
        />

        <TotalPrice mode="left" totalPrice={MainStore.strategy.totalPrice}/>

        <Button
          style={buttonStyle}
          onClick={createProject}
          title={"Создать проект"}
          classes={[""]}
          disabled={MainStore.createProjectButtonIsDisable}
        />
      </div>
    </div>
  );
});
