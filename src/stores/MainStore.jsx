const { makeObservable, observable, action } = require('mobx');

class MainStore {
  constructor() {
    makeObservable(this, {
      currentPage: observable,
      setCurrentPage: action,

      isAuth: observable,
      setIsAuth: action,

      currentStep: observable,
      setCurrentStep: action,
    });
  }

  currentPage = 'services';
  setCurrentPage(newPage) {
    this.currentPage = newPage;
  }

  isAuth = false;
  setIsAuth(bool) {
    this.isAuth = bool;
  }

  currentStep = 'step1';
  setCurrentStep(newStep) {
    this.currentStep = newStep;
  }
}

export default new MainStore();
