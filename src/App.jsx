import { createContext, useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Main from './pages/Main';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Answers from './components/Answers/Answers';

// Создание контекста
export const Context = createContext();


export function App() {

  // Залогинен ли пользователь
  const [isAuth, setIsAuth] = useState(false);

  // Страницы main | services | projects
  const [currentPage, setCurrentPage] = useState('main');
  const pages = {
    main: <Main />,
    services: <Services />,
    projects: <Projects />,
  }

  const contextData = {
    isAuth
  }

  return (
    <Context.Provider value={contextData}>
      <Header />
      {pages[currentPage]}
      <Answers />
    </Context.Provider>
  );
}
