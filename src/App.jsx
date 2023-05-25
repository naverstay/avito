import './App.scss';
import Projects from 'pages/Projects/Projects';
import { Login } from 'pages/Login/Login';
import { observer } from 'mobx-react';
import { Services } from 'pages/Services/Services';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from 'components/Header/Header';
import { SheduleStrategy } from 'pages/SheduleStrategy/SheduleStrategy';
import MainStore from 'stores/MainStore';

export const App = observer(() => {
  return (
    <>
      <Header />
      <Routes>
        {MainStore.isAuth ?
          <>
            <Route path="/" element={<Services />} />
            <Route path="/projects">
              <Route index element={<Projects />} />
              <Route path=":id" element={<SheduleStrategy />} />
            </Route>
          </>
          :
          <Route path='*' element={<Navigate to="/login" />} />
        }

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
});
