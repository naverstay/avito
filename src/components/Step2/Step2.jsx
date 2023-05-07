import './Step2.scss';
import Plate from 'components/UI/Plate/Plate';
import { useState } from 'react';
import ButtonToggler from 'components/UI/ButtonToggler/ButtonToggler';
import List from './components/List/List';
import Direct from './components/Direct/Direct';

export default function Step2() {
  const plateStyle = {
    padding: 60,
    width: '100%',
  };

  // Переключатель "Авто AI / Ручной PRO"
  const [tabs, setTabs] = useState([
    {
      title: 'Авто AI',
      isActive: true,
    },
    {
      title: 'Ручной PRO',
      isActive: false,
    },
  ]);
  const togglerStyle = {
    marginBottom: 60,
    backgroundColor: '#f9f9fb',
  };

  return (
    <section className="projects">
      <div className="projects__inner">
        <h2 className="projects__title">Стратегия размещения</h2>

        <Plate style={plateStyle}>
          <ButtonToggler buttons={tabs} style={togglerStyle} />

          <List />
          <Direct />
        </Plate>
      </div>
    </section>
  );
}
