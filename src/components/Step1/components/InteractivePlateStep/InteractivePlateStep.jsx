import Plate from 'components/UI/Plate/Plate';
import TextInput from 'components/UI/TextInput/TextInput';
import { useState } from 'react';
import './InteractivePlateStep.scss';
import FAQ from 'components/UI/FAQ/FAQ';
import SelectInput from '../SelectInput/SelectInput';
import Phrase from '../Phrase/Phrase';
import Button from 'components/UI/Button/Button';
import MainStore from 'stores/MainStore';

export default function InteractivePlateStep() {
  const plateStyle = {
    padding: '48px 60px',
    gridArea: 'c',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  // Адрес объявления
  const [adaddress, setAdaddress] = useState({
    value: '',
    placeholder: 'Укажите тут адрес вашего объявления на Авито',
  });
  function adaddresshandler(e) {
    setAdaddress({ ...adaddress, value: e.target.value });
  }

  // Страна
  const [country, setCountry] = useState({
    value: '',
    placeholder: 'Укажите страну',
  });
  function countryhandler(e) {
    setCountry({ ...country, value: e.target.value });
  }
  const countryStyle = { marginTop: 30 };
  // Город
  const [city, setCity] = useState({
    value: '',
    placeholder: 'Укажите город',
  });
  function cityhandler(e) {
    setCity({ ...city, value: e.target.value });
  }
  const cityStyle = { marginTop: 20, marginBottom: 30 };

  // Для FAQ
  const categoriesfaqstyle = {
    marginLeft: 'auto',
  };
  const categoriesfaqtext = 'Напиши что-нибудь';

  // Кнопка создать
  const buttonStyle = {
    margin: 'auto auto 0',
  };

  return (
    <Plate style={plateStyle}>
      <p className="interactive__form-title">Шаг 01</p>
      <TextInput data={adaddress} onChange={adaddresshandler} />

      <div className="formstep__item">
        <div className="formstep__item-title">
          В какой категории надо продвинуть поисковую фразу?
          <FAQ style={categoriesfaqstyle} text={categoriesfaqtext} />
        </div>

        <SelectInput />
      </div>

      <div className="formstep__item">
        <div className="formstep__item-title">
          Какую поисковую фразу надо продвинуть в Авито?
          <FAQ style={categoriesfaqstyle} text={categoriesfaqtext} />
        </div>

        <Phrase />
      </div>

      <div className="formstep__item">
        <div className="formstep__item-title">
          В каком городе надо продвинуть поисковую фразу?
          <FAQ style={categoriesfaqstyle} text={categoriesfaqtext} />
        </div>

        <TextInput
          data={country}
          onChange={countryhandler}
          style={countryStyle}
        />
        <TextInput data={city} onChange={cityhandler} style={cityStyle} />
      </div>

      <Button
        title={'Создать проект'}
        classes={['outlined']}
        style={buttonStyle}
        onClick={() => { MainStore.setCurrentStep('step2') }}
      />
    </Plate>
  );
}
