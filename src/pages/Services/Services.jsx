import Step1 from "components/Step1/Step1";
import Step2 from "components/Step2/Step2";
import { observer } from "mobx-react";
import MainStore from "stores/MainStore";

export const Services = observer(() => {
  // Подстраницы
  const steps = {
    step1: <Step1 />,
    step2: <Step2 />,
  };

  return steps[MainStore.currentStep];
})