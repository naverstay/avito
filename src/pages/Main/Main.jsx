import './Main.scss';
import Sound from "../../components/Sound/Sound";
import ButtonToggler from '../../components/UI/ButtonToggler/ButtonToggler';
import { useState } from 'react';
import Plate from '../../components/UI/Plate/Plate';

export default function Main() {

  // Табы
  const [tabs, setTabs] = useState([
    {
      title: 'Самостоятельно',
      isActive: true,
    },
    {
      title: 'Через агенства',
      isActive: false,
    }
  ]);
  const togglerStyle = {
    margin: '60px 0 100px',
  }
  function togglerHandler(e) {
    const clonedTabs = structuredClone(tabs);
    clonedTabs.forEach(i => i.isActive = false);
    const targetTab = clonedTabs.find(i => i.title === e.target.textContent);
    targetTab.isActive = true;
    setTabs(clonedTabs);
  }

  

  return (
    <main className="main">
      <div className="main__inner">

        <section className="main__intro">

          <div className="main__intro-text-container">
            <h1 className="main__title">SEO продвижение на Авито</h1>
            <p className="main__about">UPTOUP - это платформа, позволяющая быстро и просто повысить отдачу от ваших рекламных объявлений. Пользуйтесь платформой, чтобы оптимизировать затраты на рекламу, всегда опережает своих конкурентов и получать больше заявок с Авито</p>
          </div>

          <Sound />
        </section>


        <section className="main__interactive">
          <ButtonToggler buttons={tabs} style={togglerStyle} onClick={togglerHandler} />

          <div className="interactive">
            <Plate />
          </div>
        </section>
      </div>
    </main>
  );
}