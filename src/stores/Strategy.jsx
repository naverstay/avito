import { action, makeObservable, observable } from "mobx";
import copy from "utils/copy";

export default class Strategy {
  constructor(mainStore) {
    this.mainStore = mainStore;

    makeObservable(this, {
      placement: observable,
      setPlacement: action,


      isAutomaticActivityActive: observable,
      switchAutomaticActivity: action,

      isArrivedMessagesActive: observable,
      switchArrivedMessages: action,
      setArrivedMessage: action,

      isExternalTrafficActive: observable,
      switchExternalTraffic: action,
      directTitle: observable,
      setDirectTitle: action,
      directDescription: observable,
      setDirectDescription: action,


      times: observable,
      day: observable,
      week: observable,

      calendars: observable,
      addCalendar: action,
      resetCalendars: action,

      cellHandler: action,

      activitySumms: observable,
    });
  }

  ACTIVITY_MAX_CELL_QUANTITY = [
    10, // favourites
    12, // messages
    5 // subscribe
  ]



  // Стратегия размещения
  placement = 'auto';
  setPlacement(value) {
    this.placement = value;
  }


  // Тогглеры 
  isAutomaticActivityActive = false;
  switchAutomaticActivity = () => {
    this.isAutomaticActivityActive = !this.isAutomaticActivityActive;
  }

  isArrivedMessagesActive = true;
  switchArrivedMessages = () => {
    this.isArrivedMessagesActive = !this.isArrivedMessagesActive;
  }
  arrivedMessage = '';
  setArrivedMessage(value) { this.arrivedMessage = value }

  isExternalTrafficActive = true;
  switchExternalTraffic = () => {
    this.isExternalTrafficActive = !this.isExternalTrafficActive;
  }
  directTitle = '';
  setDirectTitle = (e) => { this.directTitle = e.target.value }
  directDescription = '';
  setDirectDescription = (e) => { this.directDescription = e.target.value }


  // Календарь
  times = ['07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00', '23:00 - 01:00', '01:00 - 03:00', '03:00 - 05:00', '05:00 - 07:00'];
  day = [
    Array(this.times.length).fill(0), // favourites
    Array(this.times.length).fill(0), // messages
    Array(this.times.length).fill(0), // subscribe
  ]
  week = Array(7).fill(this.day);

  // [[0,1,2], [0,1,2], ... , [0,1,2]]
  activitySumms = Array(this.week.length).fill(Array(this.day.length).fill(0));

  calendars = [{ week: copy(this.week), activitySumms: copy(this.activitySumms) }];
  addCalendar = () => {
    this.calendars.push({ week: copy(this.week), activitySumms: copy(this.activitySumms) });
  }
  resetCalendars() {
    this.calendars = [{ week: copy(this.week), activitySumms: copy(this.activitySumms) }];
  }


  cellHandler = (calendarId, daySerialNumber, activitySerialNumber, timeSerialNumber) => {
    const week = this.calendars[calendarId].week;
    const activitySumms = this.calendars[calendarId].activitySumms;

    // Текущее значение клетки
    const currentCellValue = week[daySerialNumber][activitySerialNumber][timeSerialNumber];

    // Максимальное значение клетки определенной активности favourites, messages или subscribe
    const maxValue = this.ACTIVITY_MAX_CELL_QUANTITY[activitySerialNumber];

    // Сумма определенной активности favourites, messages или subscribe (по всем календарям)
    const certainActivitySumm = this.calendars.reduce((acc, i) => (acc + i.activitySumms.reduce((acc, i) => (acc + i[activitySerialNumber]), 0)), 0)
    // const certainActivitySumm = activitySumms.reduce((acc, i) => (acc + i[activitySerialNumber]), 0);

    // Максимальное значение клеток определенной активности
    const maxValueCertainActivity = [this.mainStore.calculations.activityFavourites, this.mainStore.calculations.activityMessages, this.mainStore.calculations.activitySubscribe][activitySerialNumber];


    if (currentCellValue === maxValue || certainActivitySumm === maxValueCertainActivity) {
      week[daySerialNumber][activitySerialNumber][timeSerialNumber] = 0;

    } else if (certainActivitySumm < maxValueCertainActivity) {
      week[daySerialNumber][activitySerialNumber][timeSerialNumber]++;
    }


    // Подсчёты общей суммы
    week.forEach((day, dayIndex) => {
      day.forEach((activity, activityIndex) => {
        const activitySumm = activity.reduce((acc, cellValue) => (acc + cellValue), 0);
        activitySumms[dayIndex][activityIndex] = activitySumm;
      })
    });
  }

}