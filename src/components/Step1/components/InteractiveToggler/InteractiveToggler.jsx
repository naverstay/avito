import Toggler from 'components/UI/Toggler/Toggler';
import './InteractiveToggler.scss';

export default function InteractiveToggler({ title, isActive, price, handler }) {
  return (
    <div className="interactivetoggler">
      <Toggler isActive={isActive} handler={handler} />
      <p className="interactivetoggler__title">{title}</p>
      <p className="interactivetoggler__price">
        {price !== 0 ? price + ' ₽' : 'Бесплатно'}
      </p>
    </div>
  );
}
