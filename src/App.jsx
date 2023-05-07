import './App.scss';
import Header from './components/Header/Header';
import Projects from 'pages/Projects/Projects';
import Answers from './components/Answers/Answers';
import MainStore from 'stores/MainStore';
import { observer } from 'mobx-react';
import { Services } from 'pages/Services/Services';

export const App = observer(() => {
  // Страницы
  const pages = {
    services: <Services />,
    projects: <Projects />,
  };

  return (
    <>
      <Header />
      {pages[MainStore.currentPage]}
      <Answers />
    </>
  );
});
