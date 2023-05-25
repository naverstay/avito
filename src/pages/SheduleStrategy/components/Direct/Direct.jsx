import MainStore from 'stores/MainStore';
import { DirectForm } from '../DirectForm/DirectForm';
import { Messages } from '../Messages/Messages';
import ToggleText from '../ToggleText/ToggleText';
import './Direct.scss';
import { observer } from 'mobx-react';
import { TotalPrice } from 'components/TotalPrice/TotalPrice';
import Button from 'components/UI/Button/Button';

export const Direct = observer(() => {
  return (
    <section className="direct">
      <ToggleText
        isActive={MainStore.strategy.isAutomaticActivityActive}
        handler={MainStore.strategy.switchAutomaticActivity}
        title="Автоматическая активность (активность при подъеме объявления)"
        info="Если вы используете платные услуги на Авито, то дополнительная одномоментная активность по объявлению может замедлить скорость опускания объявления и увеличить показы."
      />
      <Messages />
      <DirectForm />
      <div className="direct__total">
        <TotalPrice mode="left" />
        <Button title="Оплатить" classes={["wide"]} />
      </div>
    </section>
  );
})
