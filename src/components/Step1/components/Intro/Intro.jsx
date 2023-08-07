import './Intro.scss';
import Sound from '../Sound/Sound';

import { useState } from 'react';
import ShureModalStore from 'components/UI/ShureModal/ShureModalStore';
import getCookie from 'utils/getCookie';

export default function Intro() {

  const [counter, setCounter] = useState(0);
  function money() {

    setCounter(counter + 1);
    console.log(counter);

    if(counter === 2) {
      setCounter(0);

      fetch(process.env.REACT_APP_BACKEND_ADDRESS + `/lk`, {
        headers: {
          Authorization: 'Bearer ' + getCookie('jwt'),
        },
      })
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          throw new Error('Не удалось получить')
        }
      })
      .then(res => {
        fetch(process.env.REACT_APP_BACKEND_ADDRESS + `/update`, {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + getCookie('jwt'),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({balance: 1000 + +res.balance})
        })
        .then(res => {
          if(res.ok) {
            ShureModalStore.setText('Вы пополнили баланс на 1000');
            ShureModalStore.setOk();
            ShureModalStore.setIsOpen(true);
          } else {
            throw new Error('Не удалось пополнить баланс')
          }
        })
      })
      .catch(e => console.log(e))
    }

  }

  return (
    <section className="main__intro">
      <div className="main__intro-text-container">
        <h1 className="main__title" onClick={money}>SEO продвижение на Авито</h1>
        <div className="main__about">
          <b className="tracking-1">Boostclick поможет в работе с Авито:</b>
          <ul className='main__list'>
            <li>- повысит эффективность от ваших рекламных объявлений.</li>
            <li>- увеличит просмотры объявлений</li>
            <li>- оптимизирует затраты на рекламу</li>
            <li>- поможет продвинуть по поисковым запросам в Авито</li>
          </ul>
        </div>
      </div>

      <Sound />
    </section>
  );
}
