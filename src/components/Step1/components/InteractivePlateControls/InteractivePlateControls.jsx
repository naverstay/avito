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

export default function InteractivePlateControls() {
  const plateStyle = {
    padding: '25px 60px 48px',
    gridArea: 'b',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const plateInteractiveTDB = [
    {
      title: 'Видимость по запросам',
      digit: 55,
      digitafter: '%',
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit, sed do eiusmod tempor incididunt adipiscing elit, sed',
    },
    {
      title: 'Активность в избранное',
      digit: 21,
      icon: hearticon,
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit, sed do eiusmod tempor incididunt adipiscing elit, sed',
    },
    {
      title: 'Активность контакты чат',
      digit: 9,
      icon: humanicon,
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit, sed do eiusmod tempor incididunt adipiscing elit, sed',
    },
    {
      title: 'Подписаться на продавца',
      digit: 1,
      icon: staricon,
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur adipiscing elit, sed do eiusmod tempor incididunt adipiscing elit, sed',
    },
  ];
  const plateInteractiveMBData = {
    title: 'Стоимость активности',
    min: 100,
    max: 1000,
    currency: '₽',
    firstTextCurrency: '₽',
    secondTextCurrency: 'действий',
  };
  const plateInteractiveTogglerData = [
    {
      title: 'Отчеты исполнителей',
      isActive: false,
      price: 1100,
    },
    {
      title: 'Мониторинг позиций',
      isActive: false,
      price: 1000,
    },
    {
      title: 'Посмотреть номер (без звонка)',
      isActive: false,
      price: 0,
    },
    {
      title: 'Просмотреть все фото дольше конкурентов',
      isActive: false,
      price: 0,
    },
    {
      title: 'Нажать показать на карте',
      isActive: false,
      price: 0,
    },
  ];
  const plateInteractiveMBData2 = {
    title: 'Отзывы',
    min: 0,
    max: 20,
    firstTextCurrency: '₽',
    secondTextCurrency: 'шт.',
  };

  return (
    <Plate style={plateStyle}>
      {plateInteractiveTDB.map((i, ind) => (
        <InteractiveTDB data={i} key={ind} />
      ))}

      <div className="interactiveMB__container">
        <InteractiveMB data={plateInteractiveMBData} />
        <FAQ text={'Добавь сюда текст или убери'} />
      </div>

      {plateInteractiveTogglerData.map((i, ind) => (
        <InteractiveToggler data={i} key={ind} />
      ))}

      <div className="interactiveMB__container">
        <InteractiveMB data={plateInteractiveMBData2} />
        <FAQ text={'Добавь сюда текст или убери'} />
      </div>

      <TotalPrice />
    </Plate>
  );
}
