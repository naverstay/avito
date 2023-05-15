import Plate from 'components/UI/Plate/Plate';
import TextInput from 'components/UI/TextInput/TextInput';
import './InteractivePlateStep.scss';
import FAQ from 'components/UI/FAQ/FAQ';
import SelectInput from '../SelectInput/SelectInput';
import { Phrase } from '../Phrase/Phrase';
import Button from 'components/UI/Button/Button';
import MainStore from 'stores/MainStore';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

export const InteractivePlateStep = observer(() => {
  const plateStyle = {
    padding: '48px 60px',
    gridArea: 'c',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const countryStyle = { marginTop: 30 };
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

  useEffect(() => {
    MainStore.calculations.calculate();
  }, []);

  return (
    <Plate style={plateStyle}>
      <p className="interactive__form-title">Шаг 01</p>
      <TextInput placeholder="Укажите тут адрес вашего объявления на Авито" value={MainStore.linkToAvitoAd} onChange={MainStore.setLinkToAvitoAd} />

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
          value={MainStore.country}
          onChange={MainStore.setCountry}
          style={countryStyle}
          placeholder="Укажите страну"
        />
        <TextInput placeholder="Укажите город" value={MainStore.city} onChange={MainStore.setCity} style={cityStyle} />
      </div>

      <Button
        title={'Создать проект'}
        classes={['outlined']}
        style={buttonStyle}
        onClick={() => { MainStore.setCurrentStep('step2') }}
        disabled={MainStore.createProjectButtonIsDisable}
      />
    </Plate>
  );
})
