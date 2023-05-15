import Plate from 'components/UI/Plate/Plate';
import InteractiveTDB from '../InteractiveTDB/InteractiveTDB';
import hearticon from 'assets/images/hearticon.svg';
import humanicon from 'assets/images/humanicon.svg';
import staricon from 'assets/images/staricon.svg';
import InteractiveMB from '../../../InteractiveMB/InteractiveMB';
import FAQ from 'components/UI/FAQ/FAQ';
import InteractiveToggler from '../InteractiveToggler/InteractiveToggler';
import './InteractivePlateControls.scss';
import TotalPrice from 'components/TotalPrice/TotalPrice';
import MainStore from 'stores/MainStore';
import { observer } from 'mobx-react';

export const InteractivePlateControls = observer(() => {
  const plateStyle = {
    padding: '25px 60px 48px',
    gridArea: 'b',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <Plate style={plateStyle}>
      <InteractiveTDB
        title="Видимость по запросам"
        digit={MainStore.calculations.vision}
        digitafter='%'
        info='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit, sed do eiusmod tempor incididunt adipiscing elit, sed'
        barWidth={MainStore.calculations.vision}
      />
      <InteractiveTDB
        title="Активность в избранное"
        digit={MainStore.calculations.activityFavourites}
        icon={hearticon}
        info='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit, sed do eiusmod tempor incididunt adipiscing elit, sed'
        barWidth={MainStore.calculations.barFavouritesWidth}
      />
      <InteractiveTDB
        title="Активность контакты чат"
        digit={MainStore.calculations.activityMessages}
        icon={humanicon}
        info='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit, sed do eiusmod tempor incididunt adipiscing elit, sed'
        barWidth={MainStore.calculations.barMessagesWidth}
      />
      <InteractiveTDB
        title="Подписаться на продавца"
        digit={MainStore.calculations.activitySubscribe}
        icon={staricon}
        info='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit, sed do eiusmod tempor incididunt adipiscing elit, sed'
        barWidth={MainStore.calculations.barSubscribeWidth}
      />

      <div className="interactiveMB__container">
        <InteractiveMB
          title='Стоимость активностей'
          min={MainStore.calculations.minActivityPrice}
          max={MainStore.calculations.maxActivityPrice}
          minBar={MainStore.calculations.activityQuantityMin}
          maxBar={MainStore.calculations.activityQuantityMax}
          currency='₽'
          firstTextCurrency='₽'
          price={MainStore.calculations.activityPrice}
          pieces={MainStore.calculations.activityQuantity}
          secondTextCurrency='действий'
          handler={MainStore.calculations.setActivityQuantity}
          value={MainStore.calculations.activityQuantity}
        />
        <FAQ text={'Добавь сюда текст или убери'} />
      </div>


      <InteractiveToggler
        title="Отчеты исполнителей"
        isActive={MainStore.calculations.reportsPriceIsActive}
        price={MainStore.calculations.REPORTS_PRICE}
        handler={MainStore.calculations.switchReportsPriceIsActive}
      />
      <InteractiveToggler
        title="Мониторинг позиций"
        isActive={MainStore.calculations.monitoringPriceIsActive}
        price={MainStore.calculations.MONITORING_PRICE}
        handler={MainStore.calculations.switchMonitoringPriceIsActive}
      />
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


      <div className="interactiveMB__container">
        <InteractiveMB
          title='Отзывы'
          min={0}
          max={3}
          price={MainStore.calculations.feedbackTotalPrice}
          pieces={MainStore.calculations.feedbackQuantity}
          handler={MainStore.calculations.setFeedbackQuantity}
          firstTextCurrency='₽'
          secondTextCurrency='шт.'
          value={MainStore.calculations.feedbackQuantity}
        />
        <FAQ text={'Добавь сюда текст или убери'} />
      </div>

      <TotalPrice />
    </Plate>
  );
})
