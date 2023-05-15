import MainStore from 'stores/MainStore';
import './TotalPrice.scss';

export default function TotalPrice({ mode = "center" }) {
  return (
    <div className={"totalprice" + (mode === "left" ? " _left" : "")}>
      <div className="totalprice__text-container">
        <p className="totalprice__title">Общая стоимость</p>
        <p className="totalprice__text">С учетом выбранных параметров и дополнительных возможностей</p>
      </div>
      <p className="totalprice__price">
        <span>{MainStore.calculations.totalPrice}</span>
        <span> ₽</span>
        <span> ≈ </span>
        <span>{MainStore.calculations.daysQuantity}</span>
        <span> дней</span>
      </p>
    </div>
  );
}