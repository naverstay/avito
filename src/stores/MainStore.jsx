import Calculations from './Calculations';

const { makeObservable, observable, action } = require('mobx');

class MainStore {

  constructor() {
    this.calculations = new Calculations(this);

    makeObservable(this, {
      currentPage: observable,
      setCurrentPage: action,

      isAuth: observable,
      setIsAuth: action,

      currentStep: observable,
      setCurrentStep: action,

      isFormModeLogin: observable,
      setIsFormModeLogin: action,

      linkToAvitoAd: observable,
      setLinkToAvitoAd: action,
      category: observable,
      setCategory: action,
      searchPhrases: observable,
      addSearchPhrase: action,
      removeSearchPhrase: action,
      country: observable,
      setCountry: action,
      city: observable,
      setCity: action,

      createProjectButtonIsDisable: observable,
    });
  }

  // Текущая страница
  currentPage = 'services';
  setCurrentPage(newPage) {
    this.currentPage = newPage;
  }

  // Залогинен ли пользователь
  isAuth = false;
  setIsAuth(bool) {
    this.isAuth = bool;
  }

  // Текущий шаг
  currentStep = 'step1';
  setCurrentStep(newStep) {
    this.currentStep = newStep;
  }

  // Тип формы
  isFormModeLogin = true;
  setIsFormModeLogin(isModeLogin) {
    this.isFormModeLogin = isModeLogin;
  }

  // Первые данные для продвижения
  // Адрес объявления на авито
  linkToAvitoAd = '';
  setLinkToAvitoAd = (e) => {
    this.linkToAvitoAd = e.target.value;

    this.checkValidation();
  };

  // Категория
  category = '';
  setCategory(value) {
    this.category = value;
    this.calculations.calculate();

    this.checkValidation();
  }

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

  // Страна
  country = '';
  setCountry = (e) => {
    this.country = e.target.value;

    this.checkValidation();
  }

  // Город
  city = '';
  setCity = (e) => {
    this.city = e.target.value;

    this.checkValidation();
  }

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
}

export default new MainStore();
