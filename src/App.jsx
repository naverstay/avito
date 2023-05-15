import './App.scss';
import Header from './components/Header/Header';
import Projects from 'pages/Projects/Projects';
import { Login } from 'pages/Login/Login';
import MainStore from 'stores/MainStore';
import { observer } from 'mobx-react';
import { Services } from 'pages/Services/Services';

export const App = observer(() => {
  // Страницы
  const pages = {
    services: <Services />,
    projects: <Projects />,
    login: <Login />,
  };

  return (
    <>
      <Header />
      {pages[MainStore.currentPage]}
    </>
  );
});
