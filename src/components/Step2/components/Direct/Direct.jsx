import DirectForm from '../DirectForm/DirectForm';
import Messages from '../Messages/Messages';
import ToggleText from '../ToggleText/ToggleText';
import './Direct.scss';

export default function Direct() {
  return (
    <section className="direct">
      <ToggleText title="Автоматическая активность (активность при подъеме объявления)" />
      <Messages />
      <ToggleText title="Внешний автотрафик Яндекс Директ" />
      <p className="direct__text">Введите текст объявления, которое будет размещаться в рекламе директ</p>
      <DirectForm />
    </section>
  );
}
