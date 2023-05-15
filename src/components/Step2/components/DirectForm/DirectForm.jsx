import TextInput from 'components/UI/TextInput/TextInput';
import './DirectForm.scss';
import { useState } from 'react';
import InteractiveMB from 'components/InteractiveMB/InteractiveMB';
import TotalPrice from 'components/TotalPrice/TotalPrice';
import Button from 'components/UI/Button/Button';

export default function DirectForm() {
  const [directTitle, setDirectTitle] = useState('');
  function directTitleHandler(e) {
    setDirectTitle(e.target.value);
  }


  const [directDescription, setDirectDescription] = useState('');
  function directDescriptionHandler(e) {
    setDirectDescription(e.target.value);
  }


  return (
    <div className="directform">
      <div className="directform__inputs">
        <TextInput placeholder="Заголовок объявления Яндекс Директ - 54 символа" maxLength={54} value={directTitle} onChange={directTitleHandler} />
        <TextInput placeholder="Описание объявления Яндекс Директ - 120 символов" maxLength={120} data={directDescription} onChange={directDescriptionHandler} />
        <InteractiveMB
          title='Лимит Яндекс Директ'
          min={100}
          max={1000}
          pieces={1}
          handler={() => { }}
          firstTextCurrency='₽ в месяц'
          secondTextCurrency='кликов'
          currency='₽'
        />
      </div>
      <div className="directform__total">
        <TotalPrice mode="left" />
        <Button title="Оплатить" classes={["wide"]} />
      </div>
    </div>
  );
}