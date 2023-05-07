import './InteractiveMB.scss';

export default function InteractiveMB({ data }) {
  function handler(e) {
    const tempValue = e.target.value;
    const progress =
      ((tempValue - e.target.min) / (e.target.max - e.target.min)) * 100;

    e.target.style.background = `linear-gradient(to right, #fed400 ${progress}%, #fff ${progress}%)`;
  }

  return (
    <div className="interactiveMB">
      <div className="interactiveMB__title-container">
        <p className="interactiveMB__title">{data.title}</p>
        <p className="interactiveMB__digit">
          <span>700</span>
          <span> {data.firstTextCurrency}</span>
          <span> ≈ </span>
          <span>31</span>
          <span> {data.secondTextCurrency}</span>
        </p>
      </div>
      <div className="interactiveMB__range">
        <input
          type="range"
          onInput={handler}
          min={data.min}
          max={data.max}
          defaultValue={0}
        />
        <div className="interactiveMB__range-digits">
          <p className="interactiveMB__range-digit">
            <span>{data.min}</span>
            <span> {data.currency && data.currency}</span>
          </p>
          <p className="interactiveMB__range-digit">
            <span>{data.max}</span>
            <span> {data.currency && data.currency}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
