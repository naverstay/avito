import FAQ from 'components/UI/FAQ/FAQ';
import './InteractiveTDB.scss';

export default function interactiveTDB({ data }) {
  const faqstyle = {
    position: 'absolute',
    right: 0,
    top: 'calc((100% - 17px) / 2)',
  };
  return (
    <div className="interactiveTDB">
      <div className="interactiveTDB__title-container">
        <p className="interactiveTDB__title">{data.title}</p>
        {data.icon && <img src={data.icon} alt="icon" />}
      </div>
      <div className="interactiveTDB__container">
        <p className="interactiveTDB__digit">
          <span>до</span>
          <span>{data.digit}</span>
          <span>{data.digitafter && data.digitafter}</span>
        </p>
        <div className="interactiveTDB__bar">
          <div className="interactiveTDB__bar-progress"></div>
        </div>
        <FAQ style={faqstyle} text={data.info} />
      </div>
    </div>
  );
}
