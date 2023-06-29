import {TextInput} from 'components/UI/TextInput/TextInput';
import './Login.scss';
import Button from 'components/UI/Button/Button';
import MainStore from 'stores/MainStore';
import { useState } from 'react';
import { observer } from 'mobx-react';
import Plate from 'components/UI/Plate/Plate';
import { useNavigate } from 'react-router-dom';

export const Login = observer(() => {
  const plateStyle = {
    padding: '45px 60px',
    margin: '0 auto',
    width: '614px',
  };
  const navigate = useNavigate();

  const [logininput, setLogininput] = useState('');
  function logininputHandler(e) {
    setLogininput(e.target.value);
    setLoginInputError('');
  }
  const [loginInputError, setLoginInputError] = useState('');

  const [passwordinput, setPasswordinput] = useState('');
  function passwordinputHandler(e) {
    setPasswordinput(e.target.value);
    setPasswordInputError('');
  }
  const [passwordInputError, setPasswordInputError] = useState('');

  function checkValidationAndFetch() {
    setLoginInputError(logininput.length < 2 ? 'Неверный логин' : '');
    setPasswordInputError(passwordinput.length < 8 ? 'Пароль должен быть не короче 8 символов' : '');

    // Все поля валидны - отправка данных в зависимости от формы
    if(logininput.length >= 2 && passwordinput.length >= 8) {
      MainStore.isFormModeLogin ? login() : signup();
    }
  }

  function signupAndFetch(address) {
                               console.log(address + '...');
    fetch(process.env.REACT_APP_BACKEND_ADDRESS + address, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ login: logininput, password: passwordinput })
    })
    .then(res => {
                                console.log('first response');
                                console.log(res);
      if(res.ok) { 
        return res.json();
      } else { 
        throw new Error();
      } 
    })
    .then((objectWithJwt) => {
                                console.log('parsed response');
                                console.log(objectWithJwt);
      document.cookie = `jwt=${objectWithJwt.jwt};path=/;max-age=31536000`
      setTimeout(()=>{navigate('/')},2000);
    })
    .catch(e => console.log('Возникла ошибка на сервере'));
  }
  function signup() { signupAndFetch('/signup') }
  function login() { signupAndFetch('/login') }




  return (
    <section className="login">
      <Plate style={plateStyle}>
        <form
          className="login__form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1 className="form__title">
            {MainStore.isFormModeLogin ? 'Вход' : 'Регистрация'}
          </h1>
          <TextInput
            placeholder="E-mail или телефон"
            value={logininput}
            onChange={logininputHandler}
            style={{ marginBottom: 30 }}
            errortext={loginInputError}
          />
          <TextInput
            placeholder="Пароль"
            value={passwordinput}
            onChange={passwordinputHandler}
            errortext={passwordInputError}
          />
          <Button
            title={
              MainStore.isFormModeLogin
                ? 'Войти в мой аккаунт'
                : 'Зарегистрироваться'
            }
            classes={['wide']}
            style={{ margin: '40px 0 47px' }}
            onClick={checkValidationAndFetch}
          />
          <div className="form__text-container">
            {/* <div className="form__container">
              <p className="form__tg-text">
                {MainStore.isFormModeLogin
                  ? 'Вход через социальную сеть:'
                  : 'Зарегистрироваться через:'}
              </p>
              <button className="form__tg">Telegram</button>
            </div> */}
            {MainStore.isFormModeLogin && (
              <div className="form__container">
                {/* <button className="form__text-link">Забыли пароль?</button> */}
                <button
                  onClick={() => {
                    MainStore.setIsFormModeLogin(false);
                  }}
                  className="form__text-link"
                >
                  Регистрация
                </button>
              </div>
            )}
          </div>
        </form>
      </Plate>
    </section>
  );
});
