import MainStore from 'stores/MainStore';
import { DirectForm } from '../DirectForm/DirectForm';
import { Messages } from '../Messages/Messages';
import ToggleText from '../ToggleText/ToggleText';
import './Direct.scss';
import { observer } from 'mobx-react';
import { TotalPrice } from 'components/TotalPrice/TotalPrice';
import Button from 'components/UI/Button/Button';
import getCookie from 'utils/getCookie';
import ShureModalStore from 'components/UI/ShureModal/ShureModalStore.jsx';
import { useNavigate, useParams } from 'react-router-dom';

export const Direct = observer(() => {

  const navigate = useNavigate();
  const { id } = useParams();

  function createProject() {
    const projectData = {
      title: MainStore.strategy.projectTitle,
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
      totalPrice: MainStore.strategy.totalPrice,

      reportsPriceIsActive: MainStore.calculations.reportsPriceIsActive,
      monitoringPriceIsActive: MainStore.calculations.monitoringPriceIsActive,
      seeNumberPriceIsActive: MainStore.calculations.seeNumberPriceIsActive,
      seePhotoPriceIsActive: MainStore.calculations.seePhotoPriceIsActive,
      showMapPriceIsActive: MainStore.calculations.showMapPriceIsActive,
      feedbackQuantity: MainStore.calculations.feedbackQuantity,

      // свойства от Стратегии размещения
      placement: MainStore.strategy.placement,
      calendars: MainStore.strategy.calendars,

      isAutomaticActivityActive: MainStore.strategy.isAutomaticActivityActive,
      
      isArrivedMessagesActive: MainStore.strategy.isArrivedMessagesActive,
      arrivedMessage: MainStore.strategy.arrivedMessage,
      
      isExternalTrafficActive: MainStore.strategy.isExternalTrafficActive,
      directTitle: MainStore.strategy.directTitle,
      directDescription: MainStore.strategy.directDescription,
      directClickQuantity: MainStore.strategy.directClickQuantity,
      // Начальное состояние
      state: 1,
    };

    // Локальное хранилище cookie
    // // Добавление проекта в Активные после оплаты
    // const paidProjects = getCookie('paidProjects') ? JSON.parse(getCookie('paidProjects')) : [];
    // paidProjects.push(projectData);
    // document.cookie = `paidProjects=${JSON.stringify(paidProjects)};path=/;max-age=31536000`;
    // // Удаление проекта из Черновики
    // let projects = JSON.parse(getCookie('projects'));
    // projects = projects.filter(i => i.title !== projectData.title);
    // document.cookie = `projects=${JSON.stringify(projects)};path=/;max-age=31536000`;
    // navigate('/projects');
    // MainStore.reset();
    // MainStore.strategy.reset();

    // Серверное хранилище
    fetch(process.env.REACT_APP_BACKEND_ADDRESS + `/lk`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + getCookie('jwt'),
      },
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        throw new Error('Не удалось получить баланс');
      }
    })
    .then(resBalance => {
      // Проверка баланса
      if(resBalance.balance < MainStore.calculations.totalPrice) {

        // Необходимо пополнить баланс
        ShureModalStore.setText('Недостаточно средств. Необходимо пополнить баланс в личном кабинете');
        ShureModalStore.setOk();
        ShureModalStore.setIsOpen(true);

      } else {

        // Баланса хватает для покупки
        // Отправка проекта
        fetch(process.env.REACT_APP_BACKEND_ADDRESS + `/projects/${id}`, {
          method: 'PUT',
          headers: {
            Authorization: 'Bearer ' + getCookie('jwt'),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        })
        .then(resProject => {
          if (resProject.ok) {

            // Оплата
            fetch(process.env.REACT_APP_BACKEND_ADDRESS + `/update`, {
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + getCookie('jwt'),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({balance: resBalance.balance - MainStore.strategy.totalPrice})
            })
            .then(res => { 
              if(res.ok) {
                navigate('/projects');
                MainStore.reset();
                MainStore.strategy.reset();
              } else {
                throw new Error('Не удалось произвести оплату')
              }
            })

          } else {
            throw new Error('Не удалось отправить проект')
          }
        })

      }
    })
    .catch(e => console.log(e));
  }

  return (
    <section className="direct">
      <ToggleText
        isActive={MainStore.strategy.isAutomaticActivityActive}
        handler={MainStore.strategy.switchAutomaticActivity}
        title="Автоматическая активность (активность при подъеме объявления)"
        info="Если вы используете платные услуги на Авито, то дополнительная одномоментная активность по объявлению может замедлить скорость опускания объявления и увеличить показы."
      />
      <Messages />
      <DirectForm />
      <div className="direct__total">
        <TotalPrice mode="left" totalPrice={MainStore.strategy.totalPrice} />
        <Button title="Оплатить" classes={["wide"]} disabled={MainStore.strategy.payButtonIsDisabled} onClick={createProject} />
      </div>
    </section>
  );
})
