import Toggler from '../../../UI/Toggler/Toggler';
import './InteractiveToggler.scss';

export default function InteractiveToggler({ data }) {
  return (
    <div className="interactivetoggler">
      <Toggler isActive={data.isActive} />
      <p className="interactivetoggler__title">{data.title}</p>
      <p className="interactivetoggler__price">
        {data.price !== 0 ? data.price + ' ₽' : 'Бесплатно'}
      </p>
    </div>
  );
}
