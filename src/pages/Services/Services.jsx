import Step1 from 'components/Step1/Step1';
import { observer } from 'mobx-react';
import Answers from 'components/Answers/Answers';

export const Services = observer(() => {
  return (
    <>
      <Step1 />
      <Answers />
    </>)
});
