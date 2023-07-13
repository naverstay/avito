import { Link } from 'react-router-dom';
import './DropDownMenu.scss';
import md5 from 'md5';
import DropDownMenuStore from './DropDownMenuStore.jsx';
import { observer } from 'mobx-react';

export const DropDownMenu = observer(() => {
  return (
    <div className={"dropdownmenu" + (DropDownMenuStore.isActive ? " _active" : "")}>
      <div className="dropdownmenu__close" onClick={DropDownMenuStore.close}></div>
      <div className="dropdownmenu__balance-container">
        <div className="dropdownmenu__balance">
          <p className="dropdownmenu__balance-text">Баланс</p>
          <p className="dropdownmenu__balance-digit">{DropDownMenuStore.balance} ₽</p>
        </div>
        <a className="dropdownmenu__button" href={"https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=boostclickru&InvId=0&IsTest=1&Encoding=utf-8&OutSum=1&SignatureValue=" + md5('boostclickru:1:0:qwerty123')}>Пополнить</a>
      </div>
      <Link to="/projects" className="dropdownmenu__link" onClick={DropDownMenuStore.close}>Мои проекты</Link>
      <Link to="/projects" className="dropdownmenu__link" onClick={DropDownMenuStore.close}>Расходы</Link>
      <Link to="/projects" className="dropdownmenu__link" onClick={DropDownMenuStore.close}>Добавить проект</Link>
      <Link to="/login" className="dropdownmenu__link" onClick={DropDownMenuStore.close}>Настройки</Link>
      <div className="dropdownmenu__link" onClick={() => { 
        document.cookie = 'jwt=;path=/;expires=-1';
        document.location.reload();
      }}>Выход</div>
    </div>
  );
})