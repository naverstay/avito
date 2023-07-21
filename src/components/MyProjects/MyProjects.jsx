import Plate from "components/UI/Plate/Plate";
import "./MyProjects.scss";
import Button from "components/UI/Button/Button";
import TableRow from "./TableRow/TableRow";
import TableHead from "./TableHead/TableHead";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getCookie from "utils/getCookie";
import { observer } from "mobx-react";
import MyProjectsStore from "./MyProjectsStore.jsx";

export const MyProjects = observer(() => {
  const plateStyle = {
    padding: "60px 25px",
    width: "100%",
    margin: "30px 0",
  };

  // Получение данных с сервера при первом рендеринге
  useEffect(() => {

    // Локальное хранилище cookie
    // if (getCookie("projects")) {
    //   MyProjectsStore.setProjects(JSON.parse(getCookie("projects")));
    // }
    // if (getCookie("paidProjects")) {
    //   MyProjectsStore.setPaidProjects(JSON.parse(getCookie("paidProjects")));
    // }

    // Серверное хранилище
    fetch(process.env.REACT_APP_BACKEND_ADDRESS + '/projects', {
      headers: {
        Authorization: 'Bearer ' + getCookie('jwt'),
      },
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        throw new Error('Не удалось получить проекты');
      }
    })
    .then(res => { MyProjectsStore.setProjects(res) })
    .catch(e => console.log(e));

  }, []);


  return (
    <>
      <div className='myprojects__title-container'>
        <h2 className='myprojects__title'>Мои проекты</h2>
        <Link to='/'>
          <Button title='Добавить проект' classes={["outlined"]} />
        </Link>
      </div>

      <Plate style={plateStyle}>
        {/* Локальное хранилище cookie */}
        {/* {MyProjectsStore.projects.length ? ( */}

        {/* Серверное хранилище */}
        {MyProjectsStore.projects.find(i => i.state.includes('Ждёт оплаты') ) ? (
          <div className='myprojects__table'>
            <TableHead />
            {/* Локальное хранилище cookie */}
            {/* {MyProjectsStore.projects.map((i, ind) => { */}

            {/* Серверное хранилище */}
            {MyProjectsStore.projects.filter(i => i.state.includes('Ждёт оплаты') ).map((i, ind) =>  <TableRow key={ind} data={i} /> )}
          </div>
        ) : (
          <p style={{ textAlign: "center", fontSize: 20, lineHeight: "1em" }}>
            Черновиков пока нет
          </p>
        )}
      </Plate>


      {/* Локальное хранилище cookie */}
      {/* {MyProjectsStore.paidProjects.length > 0 && ( */}

      {/* Серверное хранилище */}
      {MyProjectsStore.projects.find(i => i.state.match(/\d/g)) && (
        <Plate style={plateStyle}>
          <div className='myprojects__table'>
            <TableHead paidProjects={true} />
            {/* Локальное хранилище cookie */}
            {/* {MyProjectsStore.paidProjects.map((i, ind) => { */}

            {/* Серверное хранилище */}
            {MyProjectsStore.projects.filter(i => i.state.match(/\d/g)).map((i, ind) => {
              return <TableRow key={ind} data={i} paidProjects={true} />;
            })}
          </div>
        </Plate>
      )}
    </>
  );
})
