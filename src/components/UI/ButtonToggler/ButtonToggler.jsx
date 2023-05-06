import './ButtonToggler.scss';

export default function ButtonToggler(props) {
  const { buttons, style, onClick } = props;

  return (
    <div className="buttontoggler" style={style} onClick={onClick}>
      {buttons.map((i, ind) => <button className={"buttontoggler__button " + (i.isActive ? "_active" : "")} key={ind}>{i.title}</button>)}
    </div>
  );
}