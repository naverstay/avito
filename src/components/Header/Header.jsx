import './Header.scss';
import logo from 'assets/images/logo.svg';
import Button from 'components/UI/Button/Button';
import MainStore from 'stores/MainStore';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const buttons = [
    {
      title: 'Услуги',
      link: '/',
    },
    {
      title: 'Мои проекты',
      link: '/projects',
    },
  ];
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__inner" style={location.pathname !== '/login' ? {} : { justifyContent: 'center' }}>
        <a href="https://aggo.ru/"><img src={logo} alt="logo" className="header__logo" /></a>

        {location.pathname !== '/login' &&
          <>

            {buttons.map((i, ind) => (
              <Link
                to={i.link}
                key={ind}
                className={'header__link' + (location.pathname === i.link ? ' _active' : '')}
              >
                {i.title}
              </Link>
            ))}

            <a href="#answers" className="header__link">
              Обучение
            </a>

            <div className="header__auth-container">
              {MainStore.isAuth ? (
                <p className="header__user">Илья</p>
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
        }
      </div>
    </header>
  );
}
