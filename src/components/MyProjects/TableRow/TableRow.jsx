import './TableRow.scss';
import linkIcon from 'assets/images/myprojlink.svg';
import Button from 'components/UI/Button/Button';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShureModalStore from 'components/UI/ShureModal/ShureModalStore.jsx';
import getCookie from 'utils/getCookie.js';
import MyProjectsStore from '../MyProjectsStore.jsx';

export default function TableRow({ data, paidProjects = false }) {

  // Аккордион анимация
  const [isActive, setIsActive] = useState(false);
  const ref = useRef();
  const [additionalStyle, setAdditionalStyle] = useState({});
  useEffect(() => {
    setAdditionalStyle({
      paddingTop: '30px',
      paddingBottom: '30px',
      height: ref.current.scrollHeight,
    });
  }, []);

  // Копирование ссылки по клику на иконку
  const [isCopied, setIsCopied] = useState(false);
  function linkHandler() {
    navigator.clipboard.writeText(data.linkToAvitoAd);
    setIsCopied(true);
    setTimeout(() => { setIsCopied(false) }, 400);
  }

  function deleteProject() {
    // Локальное хранилище cookie
    // const filteredProjects = MyProjectsStore.projects.filter(i => i.title !== data.title);
    // document.cookie = `projects=${JSON.stringify(filteredProjects)};path=/;max-age=31536000`;
    // MyProjectsStore.setProjects(filteredProjects);

    // Серверное хранилище
    fetch(process.env.REACT_APP_BACKEND_ADDRESS + `/projects/${data.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + getCookie('jwt'),
      },
    })
    .then(res => {
      if(res.ok) {
        const filteredProjects = MyProjectsStore.projects.filter(i => i.id !== data.id);
        MyProjectsStore.setProjects(filteredProjects);
      } else {
        throw new Error('Не удалось удалить проект');
      }
    })
    .catch(e => console.log(e));

    console.log(MyProjectsStore.projects);
  }

  return (
    <div className={'tablerow' + (isActive ? ' _active' : '') + (paidProjects ? ' _paid' : '')}>
      <div className="tablerow__cells">
        <div className="_bold" onClick={() => { setIsActive(!isActive) }}>{data.title}</div>
        <div className={"tablerow__cell _link" + (isCopied ? " _copied" : "")} onClick={linkHandler}><img src={linkIcon} alt="link" /></div>

        <div className="tablerow__status">
          {paidProjects ?
            Array(10).fill().map((i, ind) => <span className={data.state > ind ? "_active" : ''} key={ind}></span>) :
            data.state
          }
        </div>

        {paidProjects && <div>{{ auto: 'Auto AI', manual: 'Ручной' }[data.placement]}</div>}

        <div className="_bold">{data.activityFavourites}</div>
        <div className="_bold">{data.activityMessages}</div>
        <div className="_bold">{data.activitySubscribe}</div>

        {!paidProjects && <div className="_bold _price">{data.totalPrice} ₽</div>}

        {paidProjects && <div className="_bold">{data.directClickQuantity ?? 0}</div>}

        {!paidProjects &&
          <div style={{display:'flex',columnGap:30,alignItems:'center'}}>

            <Link 
              // Локальное хранилище cookie
              // to={`/projects/${data.title.replace(/\D/g, '')}`}

              // Серверное хранилище
              to={`/projects/${data.id}`}
            >
              <Button classes={['small']} title="Далее" style={{padding:'0 20px'}} />
            </Link>

            <button className="tablerow__iconbutton _delete" onClick={() => {
              ShureModalStore.setText('Вы действительно хотите удалить проект?');
              ShureModalStore.setOk( deleteProject );
              ShureModalStore.setIsOpen(true);
            }}/>
          </div>
        }

        {paidProjects && 
        <div className="tablerow__iconbuttons">
          {data.placement === 'manual' && 
            // Локальное хранилище cookie
            // <Link to={`/projects/${data.title.replace(/\D/g, '')}/show`}>

            // Серверное хранилище
            <Link to={`/projects/${data.id}/show`}>

              <button className="tablerow__iconbutton _cog"/>
            </Link>
          }
          <button className="tablerow__iconbutton _refresh"></button>
        </div>
        }

      </div>
      <div ref={ref} className="tablerow__additional" style={isActive ? additionalStyle : {}}>
        <div className="tablerow__additional-container _searchphrases">
          <p className="tablerow__additional-title">Поисковые фразы</p>
          {data.searchPhrases.split(',').map((i, ind) =>
            <p className="tablerow__additional-text" key={ind}>{i}</p>
          )}
        </div>
        <div>
          <p className="tablerow__additional-title">Категория продвижения</p>
          <p className="tablerow__additional-text">{data.category}</p>
        </div>
        <div>
          <p className="tablerow__additional-title">Страна, город</p>
          <p className="tablerow__additional-text">{`${data.country}, ${data.city}`}</p>
        </div>
      </div>
    </div>
  );
}