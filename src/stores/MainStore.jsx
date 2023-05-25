import Calculations from './Calculations';
import Strategy from './Strategy';

const { makeObservable, observable, action } = require('mobx');

class MainStore {

  constructor() {
    this.calculations = new Calculations(this);
    this.strategy = new Strategy(this);

    makeObservable(this, {
      isAuth: observable,
      setIsAuth: action,

      isFormModeLogin: observable,
      setIsFormModeLogin: action,

      linkToAvitoAd: observable,
      setLinkToAvitoAd: action,
      category: observable,
      setCategory: action,
      searchPhrases: observable,
      addSearchPhrase: action,
      removeSearchPhrase: action,
      setSearchPhrases: action,
      country: observable,
      setCountry: action,
      city: observable,
      setCity: action,

      createProjectButtonIsDisable: observable,

      _resetCity: action,
      _resetCountry: action,
      _resetSearchPhrases: action,
      _resetLinkToAvitoAd: action,
      _resetCategory: action,
      reset: action,
    });
  }

  // Залогинен ли пользователь
  isAuth = true;
  setIsAuth(bool) {
    this.isAuth = bool;
  }

  // Тип формы
  isFormModeLogin = true;
  setIsFormModeLogin(isModeLogin) {
    this.isFormModeLogin = isModeLogin;
  }

  // Первые данные для продвижения
  // Адрес объявления на авито
  linkToAvitoAd = '';
  setLinkToAvitoAd = (value) => {
    this.linkToAvitoAd = value;

    this.checkValidation();
  };
  _resetLinkToAvitoAd() { this.linkToAvitoAd = '' }

  // Категория
  category = '';
  setCategory(value) {
    this.category = value;
    this.calculations.calculate();

    this.checkValidation();
  }
  _resetCategory() { this.category = '' }

  // Поисковые фразы
  searchPhrases = [];
  addSearchPhrase(value) {
    this.searchPhrases.push(value);
    this.calculations.calculate();

    this.checkValidation();
  }
  removeSearchPhrase(removedPhrase) {
    this.searchPhrases = this.searchPhrases.filter(phrase => phrase !== removedPhrase);
    this.calculations.calculate();

    this.checkValidation();
  }
  setSearchPhrases(array) { this.searchPhrases = array }
  _resetSearchPhrases() { this.searchPhrases = [] }

  // Страна
  country = '';
  setCountry = (value) => {
    this.country = value;

    this.checkValidation();
  }
  _resetCountry() { this.country = '' }

  // Город
  city = '';
  setCity = (value) => {
    this.city = value;

    this.checkValidation();
  }
  _resetCity() { this.city = '' }

  // Проверка заполненных полей
  createProjectButtonIsDisable = true;
  checkValidation() {
    if (
      this.linkToAvitoAd.length &&
      this.category.length &&
      this.searchPhrases.length &&
      this.country.length &&
      this.city.length
    ) {
      this.createProjectButtonIsDisable = false;
    } else {
      this.createProjectButtonIsDisable = true;
    }
  }

  reset() {
    this._resetCity();
    this._resetCountry();
    this._resetSearchPhrases();
    this._resetLinkToAvitoAd();
    this._resetCategory();

    this.checkValidation();
    this.calculations.reset();
  }
}

export default new MainStore();
