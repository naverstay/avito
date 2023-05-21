import MainStore from 'stores/MainStore';
import ToggleText from '../ToggleText/ToggleText';
import './Messages.scss';
import { observer } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';

export const Messages = observer(() => {
  const radiobuttons = [
    'Пришлите больше фото на WhatsApp +7 9XX XX XX',
    'Где можно посмотреть?',
    'Напишите мне в WhatsApp +7 9XX XX XX',
    'Еще продаете?',
    'У меня есть вопросы, позвоните мне на телефон +7 9XX XX XX',
  ];
  function radiobuttonHandler(e) {
    MainStore.strategy.setArrivedMessage(e.currentTarget.textContent);
  }

  // Анимация раскрытия
  const buttonsref = useRef();
  const [buttonsStyle, setButtonsStyle] = useState({});

  useEffect(() => {
    // Выбор первой радиокнопки при инициализации
    document.querySelector('.messages__radio').click();

    // Присвоение высоты
    setButtonsStyle({
      height: buttonsref.current.scrollHeight,
      marginTop: 25,
    });
  }, []);



  return (
    <div className="messages">
      <ToggleText
        isActive={MainStore.strategy.isArrivedMessagesActive}
        handler={MainStore.strategy.switchArrivedMessages}
        title="Cообщения, которые будут приходить в рамках активности в личные сообщения"
        info="Чтобы отличить активность в чате от сервиса вы можете выбрать формат обращения. Отвечать на сообщения необходимо, тк объявления с быстрыми ответами могут иметь приемущество в выдаче."
      />
      <div className="messages__radiobuttons" ref={buttonsref} style={MainStore.strategy.isArrivedMessagesActive ? buttonsStyle : {}}>
        {radiobuttons.map((i, key) => (
          <label
            onClick={radiobuttonHandler}
            className="messages__radio"
            key={key}
          >
            <input type="radio" name="message" />
            {i}
          </label>
        ))}
      </div>
    </div>
  );
});
