import "./SheduleStrategy.scss";
import Plate from "components/UI/Plate/Plate";
import { useEffect, useState } from "react";
import Answers from "components/Answers/Answers";
import { useParams } from "react-router-dom";
import getCookie from "utils/getCookie";
import MainStore from "stores/MainStore";
import { InteractiveMB } from "components/InteractiveMB/InteractiveMB";
import FAQ from "components/UI/FAQ/FAQ";
import { ManualActivities } from "./components/ManualActivities/ManualActivities";
import { ManualCalendar } from "./components/ManualCalendar/ManualCalendar";
import { observer } from "mobx-react";
import Button from "components/UI/Button/Button";
import { TotalPrice } from "components/TotalPrice/TotalPrice.jsx";
import { Link } from "react-router-dom";

export const SheduleStrategyShow = observer(() => {
  // Прокрутка вверх страницы
  useEffect(() => { window.scroll(0, 0) }, []);

  const plateStyle = {
    padding: 60,
    width: "100%",
  };

  // Получение объекта с сервера, который будем редактировать (дополнять)
  const projectId = useParams().id;
  const [currentProject, setCurrentProject] = useState(null);

  // Локальное хранилище cookie
  // useEffect(() => {
  //   const projects = JSON.parse(getCookie("paidProjects"));
  //   const data = projects.find((i) => i.title.replace(/\D/g, "") === projectId);

  //   if (data) {
  //     setCurrentProject(data);
  //     MainStore.strategy.setProjectTitle(data.title);

  //     MainStore.setLinkToAvitoAd(data.linkToAvitoAd);
  //     MainStore.setCategory(data.category);
  //     MainStore.setSearchPhrases(data.searchPhrases);
  //     MainStore.setCountry(data.country);
  //     MainStore.setCity(data.city);

  //     MainStore.calculations.setReportsPriceIsActive(data.reportsPriceIsActive);
  //     MainStore.calculations.setMonitoringPriceIsActive(data.monitoringPriceIsActive);
  //     MainStore.calculations.setSeeNumberPriceIsActive(data.seeNumberPriceIsActive);
  //     MainStore.calculations.setSeePhotoPriceIsActive( data.seePhotoPriceIsActive);
  //     MainStore.calculations.setShowMapPriceIsActive(data.showMapPriceIsActive);
  //     MainStore.calculations.setFeedbackQuantity(data.feedbackQuantity);

  //     MainStore.calculations.calculate();
  //     MainStore.calculations.setActivityQuantity(data.activityQuantity);

  //     MainStore.strategy.setCalendars(data.calendars);
  //   }
  // }, []);

  // Серверное хранилище
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_ADDRESS + `/projects/${projectId}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + getCookie('jwt'),
      },
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        throw new Error('Не удалось получить проект');
      }
    })
    .then(res => {
      console.log(res);
      if (res) {
        setCurrentProject(res);
        MainStore.strategy.setProjectTitle(res.title);

        MainStore.setLinkToAvitoAd(res.linkToAvitoAd);
        MainStore.setCategory(res.category);
        MainStore.setSearchPhrases(res.searchPhrases.split(','));
        MainStore.setCountry(res.country);
        MainStore.setCity(res.city);

        MainStore.calculations.setReportsPriceIsActive( !!+res.reportsPriceIsActive );
        MainStore.calculations.setMonitoringPriceIsActive( !!+res.monitoringPriceIsActive );
        MainStore.calculations.setSeeNumberPriceIsActive( !!+res.seeNumberPriceIsActive );
        MainStore.calculations.setSeePhotoPriceIsActive( !!+res.seePhotoPriceIsActive );
        MainStore.calculations.setShowMapPriceIsActive( !!+res.showMapPriceIsActive );
        MainStore.calculations.setFeedbackQuantity( +res.feedbackQuantity );

        MainStore.calculations.calculate();
        MainStore.calculations.setActivityQuantity(res.activityQuantity);

        MainStore.strategy.setCalendars(JSON.parse(res.calendars));
        MainStore.strategy.setDirectClickQuantity(res.directClickQuantity);
      }
    })
    .catch(e => console.log(e));
  }, []);

  return (
    <>
      <section className='projects'>
        <div className='projects__inner'>
          <h2 className='projects__title'>Стратегия размещения</h2>

          <Plate style={plateStyle}>
            {currentProject ? (
              <>
                {/* <div
                  className='projects__upper-container'
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                >
                  <InteractiveMB
                    title='Стоимость активностей'
                    min={MainStore.calculations.minActivityPrice}
                    max={MainStore.calculations.maxActivityPrice}
                    minBar={MainStore.calculations.activityQuantityMin}
                    maxBar={MainStore.calculations.activityQuantityMax}
                    firstpreprice='от '
                    secondpreprice='до '
                    currency='₽'
                    firstTextCurrency='₽'
                    price={MainStore.calculations.activityPrice}
                    pieces={MainStore.calculations.activityQuantity}
                    secondTextCurrency='действий'
                    handler={() => {}}
                    value={MainStore.calculations.activityQuantity}
                    style={{ maxWidth: "none" }}
                  />
                  <div
                    className='projects__upper-text-container'
                    style={{ width: "100%" }}
                  >
                    <p className='projects__upper-text'>
                      Выберите расписание действий
                    </p>
                    <FAQ text='В режиме "Ручной PRO" необходимо самостоятельно распределить весь пакет активностей по времени. Учитывайте при распределение активность вашей аудитории и покупку платных услуг на Авито.' />
                  </div>
                </div> */}

                <ManualActivities />
                {MainStore.strategy.calendars.map((_, key) => (
                  <ManualCalendar key={key} id={key} />
                ))}

                <div className='direct__total'>
                  <TotalPrice
                    mode='left'
                    totalPrice={MainStore.strategy.totalPrice}
                  />
                  <Link to='/projects'>
                    <Button
                      title='Закрыть'
                      classes={["wide"]}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <p style={{ textAlign: "center", fontSize: 22 }}>
                Проекта не существует
              </p>
            )}
          </Plate>
        </div>
      </section>
      <Answers />
    </>
  );
});
