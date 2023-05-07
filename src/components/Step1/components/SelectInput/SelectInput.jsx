import { useEffect, useRef, useState } from 'react';
import './SelectInput.scss';
import SelectTag from '../SelectTag/SelectTag';

export default function SelectInput() {
  // Категории
  const [categories, setCategories] = useState([
    {
      title: 'Транспорт',
      isActive: false,
    },
    {
      title: 'Недвижимость',
      isActive: false,
    },
    {
      title: 'Товары',
      isActive: false,
    },
    {
      title: 'Работа',
      isActive: false,
    },
    {
      title: 'Услуги',
      isActive: false,
    },
    {
      title: 'Личные вещи',
      isActive: false,
    },
    {
      title: 'Для дома и дачи',
      isActive: false,
    },
    {
      title: 'Электроника',
      isActive: false,
    },
    {
      title: 'Хобби и отдых',
      isActive: false,
    },
    {
      title: 'Животные',
      isActive: false,
    },
    {
      title: 'Готовый бизнес и оборудование',
      isActive: false,
    },
    {
      title: 'Запчасти и аксессуары',
      isActive: false,
    },
  ]);

  const [isActive, setIsActive] = useState(false);
  function selecthandler(e) {
    if (e.target.className.includes('formstep__select-title')) {
      setIsActive(!isActive);
    } else if (e.target.className.includes('formstep__select-item')) {
      const clone = structuredClone(categories);
      const changedObject = clone.find((i) => i.title === e.target.textContent);
      changedObject.isActive = !changedObject.isActive;
      setCategories(clone);
    } else if (e.target.className.includes('close')) {
      const target = e.target.closest('.select__tag');
      const clone = structuredClone(categories);
      const changedObject = clone.find((i) => i.title === target.textContent);
      changedObject.isActive = false;
      setCategories(clone);
    }
  }
  const dataContainer = useRef();
  const [dataContainerStyle, setDataContainerStyle] = useState();
  useEffect(() => {
    setDataContainerStyle({
      paddingTop: '17px',
      paddingBottom: '51px',
      borderTop: '2px solid rgba(30, 30, 30, 0.3)',
      height: dataContainer.current.scrollHeight,
    });
  }, []);

  return (
    <div
      className={'formstep__select ' + (isActive ? '_active' : '')}
      onClick={selecthandler}
    >
      <div className="formstep__select-title-container">
        <div className="formstep__select-title ">
          {categories.find((i) => i.isActive)
            ? categories
                .filter((i) => i.isActive)
                .map((i, ind) => <SelectTag key={ind} title={i.title} />)
            : 'Выберите категорию'}
        </div>
      </div>
      <div
        className="formstep__select-data"
        ref={dataContainer}
        style={isActive ? dataContainerStyle : {}}
      >
        {categories.map((i, ind) => (
          <span
            key={ind}
            className={'formstep__select-item ' + (i.isActive ? '_active' : '')}
          >
            {i.title}
          </span>
        ))}
      </div>
    </div>
  );
}
