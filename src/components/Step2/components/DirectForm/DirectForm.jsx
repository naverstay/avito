import TextInput from 'components/UI/TextInput/TextInput';
import './DirectForm.scss';
import { useState } from 'react';
import InteractiveMB from 'components/InteractiveMB/InteractiveMB';
import TotalPrice from 'components/TotalPrice/TotalPrice';
import Button from 'components/UI/Button/Button';

export default function DirectForm() {
  const [directTitle, setDirectTitle] = useState({
    value: '',
    placeholder: 'Заголовок объявления Яндекс Директ - 54 символа',
    maxLength: 54,
  });
  function directTitleHandler(e) {
    setDirectTitle({ ...directTitle, value: e.target.value });
  }


  const [directDescription, setDirectDescription] = useState({
    value: '',
    placeholder: 'Описание объявления Яндекс Директ - 120 символов',
    maxLength: 120,
  });
  function directDescriptionHandler(e) {
    setDirectDescription({ ...directDescription, value: e.target.value });
  }


  const interactiveMBdata = {
    title: 'Лимит Яндекс Директ',
    firstTextCurrency: '₽ в месяц',
    secondTextCurrency: 'кликов',
    min: '100',
    max: '1000',
    currency: '₽',
  };


  return (
    <div className="directform">
      <div className="directform__inputs">
        <TextInput data={directTitle} onChange={directTitleHandler} />
        <TextInput data={directDescription} onChange={directDescriptionHandler} />
        <InteractiveMB data={interactiveMBdata} />
      </div>
      <div className="directform__total">
        <TotalPrice mode="left" />
        <Button title="Оплатить" classes={["wide"]} />
      </div>
    </div>
  );
}