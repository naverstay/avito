import './TableRow.scss';
import linkIcon from 'assets/images/myprojlink.svg';
import Button from 'components/UI/Button/Button';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TableRow({ data }) {

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
  const [isCopied, seIsCopied] = useState(false);
  function linkHandler() {
    navigator.clipboard.writeText(data.linkToAvitoAd);
    seIsCopied(true);
    setTimeout(() => { seIsCopied(false) }, 400);
  }

  return (
    <div className={'tablerow ' + (isActive ? '_active' : '')}>
      <div className="tablerow__cells">
        <div className="_bold" onClick={() => { setIsActive(!isActive) }}>{data.title}</div>
        <div className={"tablerow__cell _link" + (isCopied ? " _copied" : "")} onClick={linkHandler}><img src={linkIcon} alt="link" /></div>
        <div>{data.state}</div>
        <div className="_bold">{data.activityFavourites}</div>
        <div className="_bold">{data.activityMessages}</div>
        <div className="_bold">{data.activitySubscribe}</div>
        <div className="_bold _price">{data.totalPrice} ₽</div>
        <div>
          <Link to={`/projects/${data.title.replace(/\D/g, '')}`}>
            <Button style={{ width: 166 }} classes={['small']} title="Далее" />
          </Link>
        </div>
      </div>
      <div ref={ref} className="tablerow__additional" style={isActive ? additionalStyle : {}}>
        <div className="tablerow__additional-container _searchphrases">
          <p className="tablerow__additional-title">Поисковые фразы</p>
          {data.searchPhrases.map((i, ind) =>
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