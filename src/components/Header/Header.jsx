import './Header.scss';

import logo from '../../assets/images/logo.svg';
import Button from '../UI/Button/Button';
import { useContext } from 'react';
import { Context } from '../../App';

export default function Header() {
  const contextData = useContext(Context);

  return (
    <header className='header'>
      <div className="header__inner">

        <img src={logo} alt="logo" className="header__logo" />
        <button className="header__link">Услуги</button>
        <button className="header__link">Мои проекты</button>
        <a href="/learning" className="header__link">Обучение</a>

        <div className="header__auth-container">
          {contextData.isAuth ?
            <p className="header__user">Илья</p>
            :
            <>
              <Button title="Вход" classes={['small']} />
              <Button title="Регистрация" classes={['outlined', 'small']} />
            </>
          }
        </div>

      </div>
    </header>
  );
}