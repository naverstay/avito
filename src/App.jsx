import "./App.scss";
import Projects from "pages/Projects/Projects";
import { Login } from "pages/Login/Login";
import { observer } from "mobx-react";
import { Services } from "pages/Services/Services";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "components/Header/Header";
import { SheduleStrategy } from "pages/SheduleStrategy/SheduleStrategy";
import { SheduleStrategyShow } from "pages/SheduleStrategy/SheduleStrategyShow";
import getCookie from "utils/getCookie.js";
import { useEffect } from "react";
import { ShureModal } from "components/UI/ShureModal/ShureModal";
import ShureModalStore from "components/UI/ShureModal/ShureModalStore";

export const App = observer(() => {

  // Окно подтверждения оплаты
  const location = useLocation();
  useEffect(() => {
    if(location.hash === '#success') {
      ShureModalStore.setText('Оплата прошло успешна!');
      ShureModalStore.setOk();
      ShureModalStore.setIsOpen(true);
    } else if(location.hash === '#failed') {
      ShureModalStore.setText('При совершении оплаты произошла ошибка. Попробуйте снова');
      ShureModalStore.setOk();
      ShureModalStore.setIsOpen(true);
    }
  }, [location]);

  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Services />} />

        {getCookie('jwt') && (
          <Route path='/projects'>
            <Route index element={<Projects />} />
            <Route path=':id'>
              <Route index element={<SheduleStrategy />} />
              <Route path='show' element={<SheduleStrategyShow />} />
            </Route>
          </Route>
        )}

        <Route path='/login' element={<Login />} />

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>

      <ShureModal />
    </>
  );
});
