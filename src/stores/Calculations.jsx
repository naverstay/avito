import { action, makeObservable, observable } from 'mobx';

export default class Calculations {
  constructor(mainStore) {
    this.mainStore = mainStore;

    makeObservable(this, {
      activityQuantity: observable,

      activityQuantityMin: observable,
      activityQuantityMax: observable,

      minActivityPrice: observable,
      maxActivityPrice: observable,

      activityFavourites: observable,
      activityMessages: observable,
      activitySubscribe: observable,
      vision: observable,
      activityPrice: observable,
      barFavouritesWidth: observable,
      barMessagesWidth: observable,
      barSubscribeWidth: observable,

      REPORTS_PRICE: observable,
      MONITORING_PRICE: observable,
      SEE_NUMBER_PRICE: observable,
      SEE_PHOTO_PRICE: observable,
      SHOW_MAP_PRICE: observable,

      reportsPriceIsActive: observable,
      switchReportsPriceIsActive: action,
      monitoringPriceIsActive: observable,
      switchMonitoringPriceIsActive: action,
      seeNumberPriceIsActive: observable,
      switchSeeNumberPriceIsActive: action,
      seePhotoPriceIsActive: observable,
      switchSeePhotoPriceIsActive: action,
      showMapPriceIsActive: observable,
      switchShowMapPriceIsActive: action,

      feedbackQuantity: observable,
      feedbackTotalPrice: observable,
      setFeedbackQuantity: action,

      daysQuantity: observable,
      totalPrice: observable,

      setActivityQuantity: action,
      calculate: action,
    });
  }



  // Основные множители и константы
  // RUB
  PRICE_FAVOURITES = 5;
  PRICE_SUBSCRIBE = 5;
  PRICE_MESSAGES = 6;

  // %
  RESERVE_FAVOURITES = 1.1;
  RESERVE_SUBSCRIBE = 1.2;
  RESERVE_MESSAGES = 1.2;

  // Vision %
  MIN_VISION = 30;
  MAX_VISION = 90;

  // Скидка за количество поисковых фраз
  SEARCH_PHRASES_DISCOUNT = [1, 0.9, 0.85, 0.8];

  // Доп. опции
  REPORTS_PRICE = 1100;
  MONITORING_PRICE = 1000;
  SEE_NUMBER_PRICE = 0;
  SEE_PHOTO_PRICE = 0;
  SHOW_MAP_PRICE = 0;

  // Отзывы
  FEEDBACK_PRICE = 90;

  // Количество дней работы
  DAYS_QUANTITY = [10, 20, 30];




  // Категории множитель
  categoryMultiplies = [
    {
      title: 'Транспорт',
      multiply: 3,
    },
    {
      title: 'Недвижимость',
      multiply: 2.5,
    },
    {
      title: 'Товары',
      multiply: 3,
    },
    {
      title: 'Работа',
      multiply: 2,
    },
    {
      title: 'Услуги',
      multiply: 3,
    },
    {
      title: 'Личные вещи',
      multiply: 2,
    },
    {
      title: 'Для дома и дачи',
      multiply: 2.5,
    },
    {
      title: 'Электроника',
      multiply: 2,
    },
    {
      title: 'Хобби и отдых',
      multiply: 2,
    },
    {
      title: 'Животные',
      multiply: 2,
    },
    {
      title: 'Готовый бизнес и оборудование',
      multiply: 2.5,
    },
    {
      title: 'Запчасти и аксессуары',
      multiply: 2,
    },
  ];
  categoryMultiply = null;
  setCategoryMultiply() {
    if (this.mainStore.category) {

      this.categoryMultiply = this.categoryMultiplies.find(
        (i) => i.title === this.mainStore.category
      ).multiply;

    } else {
      this.categoryMultiply = 2;
    }
  }


  // Поисковые фразы количество
  searchPhrasesActivityBorders = [
    { min: 15, max: 81 },
    { min: 20, max: 140 },
    { min: 25, max: 180 },
    { min: 30, max: 240 },
  ];
  searchPhrasesQuantity = null;
  activityQuantityMin = null;
  activityQuantityMax = null;
  setActivityBorders() {
    this.searchPhrasesQuantity = this.mainStore.searchPhrases.length ? this.mainStore.searchPhrases.length - 1 : 0;

    this.activityQuantityMin = this.searchPhrasesActivityBorders[this.searchPhrasesQuantity].min;
    this.activityQuantityMax = this.searchPhrasesActivityBorders[this.searchPhrasesQuantity].max;
  }


  // Уровень активностей
  activityCoeff = [
    [0.85, 0.1, 0.05],
    [0.88, 0.08, 0.04],
    [0.90, 0.07, 0.03],
  ];
  activityLevel = 0;
  activityFavouritesCoeff = this.activityCoeff[this.activityLevel][0];
  activityMessagesCoeff = this.activityCoeff[this.activityLevel][1];
  activitySubscribeCoeff = this.activityCoeff[this.activityLevel][2];
  setActivityCoeff() {
    const percent = (this.activityQuantity - this.activityQuantityMin) / (this.activityQuantityMax - this.activityQuantityMin) * 100;
    if (percent < 33) {
      this.activityLevel = 0;
    } else if (percent >= 33 && percent <= 66) {
      this.activityLevel = 1;
    } else if (percent > 66) {
      this.activityLevel = 2;
    }
    this.activityFavouritesCoeff = this.activityCoeff[this.activityLevel][0];
    this.activityMessagesCoeff = this.activityCoeff[this.activityLevel][1];
    this.activitySubscribeCoeff = this.activityCoeff[this.activityLevel][2];
  }


  // Количество активностей
  // MIN
  minActivityFavourites = null;
  minActivityMessages = null;
  minActivitySubscribe = null;
  setMinActivityQuantity() {
    this.minActivityFavourites = Math.round(this.activityQuantityMin * this.activityCoeff[0][0]);
    this.minActivityMessages = Math.round(this.activityQuantityMin * this.activityCoeff[0][1]);
    this.minActivitySubscribe = this.activityQuantityMin - this.minActivityFavourites - this.minActivityMessages;
  }
  // MAX
  maxActivityFavourites = null;
  maxActivityMessages = null;
  maxActivitySubscribe = null;
  setMaxActivityQuantity() {
    this.maxActivityFavourites = Math.round(this.activityQuantityMax * this.activityCoeff[2][0]);
    this.maxActivityMessages = Math.round(this.activityQuantityMax * this.activityCoeff[2][1]);
    this.maxActivitySubscribe = this.activityQuantityMax - this.maxActivityFavourites - this.maxActivityMessages;
  }


  // Значения ползунка активностей
  // MIN
  minActivityPrice = null;
  setMinActivityPrice() {
    this.minActivityPrice =
      Math.ceil(
        (
          (this.minActivityFavourites * this.PRICE_FAVOURITES * this.RESERVE_FAVOURITES) +
          (this.minActivityMessages * this.PRICE_MESSAGES * this.RESERVE_MESSAGES) +
          (this.minActivitySubscribe * this.PRICE_SUBSCRIBE * this.RESERVE_SUBSCRIBE)
        ) * this.categoryMultiply * this.SEARCH_PHRASES_DISCOUNT[this.searchPhrasesQuantity]);
  }
  // MAX
  maxActivityPrice = null;
  setMaxActivityPrice() {
    this.maxActivityPrice =
      Math.ceil(
        (
          (this.maxActivityFavourites * this.PRICE_FAVOURITES * this.RESERVE_FAVOURITES) +
          (this.maxActivityMessages * this.PRICE_MESSAGES * this.RESERVE_MESSAGES) +
          (this.maxActivitySubscribe * this.PRICE_SUBSCRIBE * this.RESERVE_SUBSCRIBE)
        ) * this.categoryMultiply * this.SEARCH_PHRASES_DISCOUNT[this.searchPhrasesQuantity]);
  }
  // Выбранная пользователем цена
  activityPrice = this.minActivityPrice;
  setActivityPrice() {
    this.activityPrice =
      Math.ceil(
        (
          (this.activityFavourites * this.PRICE_FAVOURITES * this.RESERVE_FAVOURITES) +
          (this.activityMessages * this.PRICE_MESSAGES * this.RESERVE_MESSAGES) +
          (this.activitySubscribe * this.PRICE_SUBSCRIBE * this.RESERVE_SUBSCRIBE)
        ) * this.categoryMultiply * this.SEARCH_PHRASES_DISCOUNT[this.searchPhrasesQuantity]);
  }


  // Видимость
  vision = null;
  setVision() {
    this.vision = Math.round((this.activityQuantity - this.activityQuantityMin) * (this.MAX_VISION - this.MIN_VISION) / (this.activityQuantityMax - this.activityQuantityMin) + this.MIN_VISION);
  }


  // Длина шкал активностей
  barFavouritesWidth = null;
  barMessagesWidth = null;
  barSubscribeWidth = null;
  setBarsWidth() {
    this.barFavouritesWidth = Math.round(this.activityFavourites / this.maxActivityFavourites * 100);
    this.barMessagesWidth = Math.round(this.activityMessages / this.maxActivityMessages * 100);
    this.barSubscribeWidth = this.activitySubscribe > this.maxActivitySubscribe ? 100 : Math.round(this.activitySubscribe / this.maxActivitySubscribe * 100);
  }


  // Количество дней работы
  daysQuantity = null;
  setDaysQuantity() {
    const percent = (this.activityQuantity - this.activityQuantityMin) / (this.activityQuantityMax - this.activityQuantityMin) * 100;
    if (percent < 33) {
      this.daysQuantity = this.DAYS_QUANTITY[0];
    } else if (percent >= 33 && percent <= 66) {
      this.daysQuantity = this.DAYS_QUANTITY[1];
    } else if (percent > 66) {
      this.daysQuantity = this.DAYS_QUANTITY[2];
    }
  }




  // Доп. опции
  reportsPriceIsActive = false;
  switchReportsPriceIsActive = () => {
    this.reportsPriceIsActive = !this.reportsPriceIsActive;
    this.setTotalPrice();
  }
  monitoringPriceIsActive = false;
  switchMonitoringPriceIsActive = () => {
    this.monitoringPriceIsActive = !this.monitoringPriceIsActive;
    this.setTotalPrice();
  }
  seeNumberPriceIsActive = false;
  switchSeeNumberPriceIsActive = () => {
    this.seeNumberPriceIsActive = !this.seeNumberPriceIsActive;
    this.setTotalPrice();
  }
  seePhotoPriceIsActive = false;
  switchSeePhotoPriceIsActive = () => {
    this.seePhotoPriceIsActive = !this.seePhotoPriceIsActive;
    this.setTotalPrice();
  }
  showMapPriceIsActive = false;
  switchShowMapPriceIsActive = () => {
    this.showMapPriceIsActive = !this.showMapPriceIsActive;
    this.setTotalPrice();
  }

  // Отзывы
  feedbackQuantity = 1;
  feedbackTotalPrice = this.FEEDBACK_PRICE;
  setFeedbackQuantity = (value) => {
    this.feedbackQuantity = value;
    this.feedbackTotalPrice = this.feedbackQuantity * this.FEEDBACK_PRICE;

    this.setTotalPrice();
  }




  // Изменение фразы и категории
  calculate() {
    console.log('calculation');
    this.setCategoryMultiply();
    this.setActivityBorders();
    this.setMinActivityQuantity();
    this.setMaxActivityQuantity();
    this.setMinActivityPrice();
    this.setMaxActivityPrice();

    this.setActivityQuantity(this.activityQuantityMin);
  }

  // Изменение ползунка активностей
  activityFavourites = null;
  activityMessages = null;
  activitySubscribe = null;
  activityQuantity = 0;
  setActivityQuantity = (value) => {
    this.setActivityCoeff();

    this.activityQuantity = value;

    this.activityFavourites = Math.round(this.activityQuantity * this.activityFavouritesCoeff);
    this.activityMessages = Math.round(this.activityQuantity * this.activityMessagesCoeff);
    this.activitySubscribe = this.activityQuantity - this.activityFavourites - this.activityMessages;

    this.setVision();
    this.setActivityPrice();
    this.setBarsWidth();
    this.setTotalPrice();
    this.setDaysQuantity();
  }


  // Общая цена
  totalPrice = 0;
  setTotalPrice() {
    this.totalPrice =
      this.activityPrice +
      (this.reportsPriceIsActive ? this.REPORTS_PRICE : 0) +
      (this.monitoringPriceIsActive ? this.MONITORING_PRICE : 0) +
      (this.seeNumberPriceIsActive ? this.SEE_NUMBER_PRICE : 0) +
      (this.seePhotoPriceIsActive ? this.SEE_PHOTO_PRICE : 0) +
      (this.showMapPriceIsActive ? this.SHOW_MAP_PRICE : 0) +
      this.feedbackTotalPrice;
  }

}
