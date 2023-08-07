import './Header.scss';
import logo from 'assets/images/logo.svg';
import Button from 'components/UI/Button/Button';
import MainStore from 'stores/MainStore';
import { Link, useLocation } from 'react-router-dom';
import { DropDownMenu } from 'components/DropDownMenu/DropDownMenu';
import getCookie from 'utils/getCookie.js';
import DropDownMenuStore from 'components/DropDownMenu/DropDownMenuStore.jsx';
import { observer } from 'mobx-react';

export const Header = observer(() => {
  // Ссылки на страницы
  const buttons = [
    {
      title: 'Услуги',
      link: '/',
    },
    {
      title: 'Мои проекты',
      link: getCookie('jwt') ? '/projects' : '/login',
    },
  ];
  const location = useLocation();

  return (
    <header className="header">
      <div
        className="header__inner"
        style={
          location.pathname !== '/login' ? {} : { justifyContent: 'center' }
        }
      >
        <a href="/" className="header__logo">
          <img src={logo} alt="logo" />
        </a>

        {location.pathname !== '/login' && (
          <>
            {buttons.map((i, ind) => (
              <Link
                to={i.link}
                key={ind}
                className={
                  'header__link' +
                  (location.pathname === i.link ? ' _active' : '')
                }
              >
                {i.title}
              </Link>
            ))}

            <a href="#answers" className="header__link">
              FAQ
            </a>

            <div className="header__auth-container">
              {getCookie('jwt') ? (
                <div className="header__user-container">
                  <div className="header__user" onClick={DropDownMenuStore.open}>Личный кабинет</div>
                  <DropDownMenu />
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      title="Вход"
                      classes={['small']}
                      onClick={() => {
                        MainStore.setIsFormModeLogin(true);
                      }}
                    />
                  </Link>
                  <Link to="/login">
                    <Button
                      title="Регистрация"
                      classes={['outlined', 'small']}
                      onClick={() => {
                        MainStore.setIsFormModeLogin(false);
                      }}
                    />
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
})
