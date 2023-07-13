import "./App.scss";
import Projects from "pages/Projects/Projects";
import { Login } from "pages/Login/Login";
import { observer } from "mobx-react";
import { Services } from "pages/Services/Services";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "components/Header/Header";
import { SheduleStrategy } from "pages/SheduleStrategy/SheduleStrategy";
import { SheduleStrategyShow } from "pages/SheduleStrategy/SheduleStrategyShow.jsx";
import getCookie from "utils/getCookie.js";

export const App = observer(() => {

  // fetch(process.env.REACT_APP_BACKEND_ADDRESS + `/update`, {
  //         method: 'POST',
  //         headers: {
  //           Authorization: 'Bearer ' + getCookie('jwt'),
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({balance: 3000})
  //       })

  return (
    <>
      <Header />
      <Routes>
        {getCookie('jwt') ? (
          <>
            <Route path='/' element={<Services />} />
            <Route path='/boostclick' element={<Services />} />
            <Route path='/projects'>
              <Route index element={<Projects />} />
              <Route path=':id'>
                <Route index element={<SheduleStrategy />} />
                <Route path='show' element={<SheduleStrategyShow />} />
              </Route>
            </Route>
          </>
        ) : (
          <>
            <Route path='*' element={<Navigate to='/login' />} />
          </>
        )}

        <Route path='/login' element={<Login />} />

        <Route path='*' element={<Login />} />
      </Routes>
    </>
  );
});
