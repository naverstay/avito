import ToggleText from '../ToggleText/ToggleText';
import './Messages.scss';

export default function Messages() {
  const radiobuttons = [
    {
      title: 'Пришлите больше фото на WhatsApp +7 9XX XX XX',
      isActive: true,
    },
    {
      title: 'Где можно посмотреть?',
      isActive: true,
    },
    {
      title: 'Напишите мне в WhatsApp +7 9XX XX XX',
      isActive: true,
    },
    {
      title: 'Еще продаете?',
      isActive: true,
    },
    {
      title: 'У меня есть вопросы, позвоните мне на телефон +7 9XX XX XX',
      isActive: true,
    },
  ];

  return (
    <div className="messages">
      <ToggleText title="Cообщения, которые будут приходить в рамках активности в личные сообщения" />
      <div className="messages__radiobuttons">
        {radiobuttons.map((i, key) => <label className="messages__radio" key={key}><input type="radio" name="message" />{i.title}</label>)}
      </div>
    </div>
  );
}