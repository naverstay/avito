import TextInput from 'components/UI/TextInput/TextInput';
import './Login.scss';
import Button from 'components/UI/Button/Button';
import MainStore from 'stores/MainStore';
import { useState } from 'react';
import { observer } from 'mobx-react';
import Plate from 'components/UI/Plate/Plate';

export const Login = observer(() => {

  const plateStyle = {
    padding: '45px 60px',
    margin: '0 auto',
    width: '614px',
  }

  const [logininput, setLogininput] = useState('');
  function logininputHandler(e) {
    setLogininput(e.target.value);
  }

  const [passwordinput, setPasswordinput] = useState('');
  function passwordinputHandler(e) {
    setPasswordinput(e.target.value);
  }

  function submitHandler() {
    if (MainStore.isFormModeLogin) {
      MainStore.setCurrentPage('services');
    } else {
      MainStore.setIsFormModeLogin(true);
    }
  }

  return (
    <>
      <section className="login">
        <Plate style={plateStyle}>
          <form className="login__form" onSubmit={(e) => { e.preventDefault() }}>
            <h1 className="form__title">{MainStore.isFormModeLogin ? "Вход" : "Регистрация"}</h1>
            <TextInput placeholder="E-mail или телефон" value={logininput} onChange={logininputHandler} style={{ marginBottom: 30 }} />
            <TextInput placeholder="Пароль" value={passwordinput} onChange={passwordinputHandler} />
            <Button title={MainStore.isFormModeLogin ? "Войти в мой аккаунт" : "Зарегистрироваться"} classes={["wide"]} style={{ margin: '40px 0 47px' }} onClick={submitHandler} />
            <div className="form__text-container">
              <div className="form__container">
                <p className="form__tg-text">{MainStore.isFormModeLogin ? "Вход через социальную сеть:" : "Зарегистрироваться через:"}</p>
                <button className="form__tg">Telegram</button>
              </div>
              {MainStore.isFormModeLogin &&
                <div className="form__container">
                  <button className="form__text-link">Забыли пароль?</button>
                  <button onClick={() => { MainStore.setIsFormModeLogin(false) }} className="form__text-link">Регистрация</button>
                </div>
              }
            </div>
          </form>
        </Plate>
      </section>
    </>
  );
})