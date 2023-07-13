import { observable, action, makeObservable } from 'mobx';
import getCookie from "utils/getCookie.js";

class DropDownMenuStore {
  constructor() {
    makeObservable(this, {
      isActive: observable,
      setIsActive: action,
      open: action,
      close: action,
  
      balance: observable,
      changeBalance: action,
    });
  }

  isActive = false;
  setIsActive(boolean) { this.isActive = boolean }
  open = async () => {
    fetch(process.env.REACT_APP_BACKEND_ADDRESS + '/lk', {
      headers: {
        Authorization: 'Bearer ' + getCookie('jwt'),
      },
    })
    .then(res => res.json())
    .then(res => this.changeBalance(res.balance));

    this.setIsActive(true);
  }
  close = () => {
    this.setIsActive(false);
  }

  balance = 0;
  changeBalance(newBalance) {
    this.balance = newBalance;
  }
}

export default new DropDownMenuStore();
