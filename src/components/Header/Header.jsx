import './Header.scss';

import logo from 'assets/images/logo.svg';
import Button from 'components/UI/Button/Button';
import MainStore from 'stores/MainStore';

export default function Header() {
  const buttons = [
    {
      title: 'Услуги',
      name: 'services',
      isActive: MainStore.currentPage === 'services',
    },
    {
      title: 'Мои проекты',
      name: 'projects',
      isActive: MainStore.currentPage === 'projects',
    },
  ];

  return (
    <header className="header">
      <div className="header__inner" style={MainStore.currentPage !== 'login' ? {} : { justifyContent: 'center' }}>
        <a href="https://aggo.ru/"><img src={logo} alt="logo" className="header__logo" /></a>

        {MainStore.currentPage !== 'login' &&
          <>

            {buttons.map((i, ind) => (
              <button
                key={ind}
                className={'header__link' + (i.isActive ? ' _active' : '')}
                onClick={() => {
                  MainStore.setCurrentPage(i.name);
                }}
              >
                {i.title}
              </button>
            ))}

            <a href="#answers" className="header__link">
              Обучение
            </a>

            <div className="header__auth-container">
              {MainStore.isAuth ? (
                <p className="header__user">Илья</p>
              ) : (
                <>
                  <Button
                    title="Вход"
                    classes={['small']}
                    onClick={() => {
                      MainStore.setCurrentPage('login');
                      MainStore.setIsFormModeLogin(true);
                    }}
                  />
                  <Button
                    title="Регистрация"
                    classes={['outlined', 'small']}
                    onClick={() => {
                      MainStore.setCurrentPage('login');
                      MainStore.setIsFormModeLogin(false);
                    }}
                  />
                </>
              )}
            </div>
          </>
        }
      </div>
    </header>
  );
}
