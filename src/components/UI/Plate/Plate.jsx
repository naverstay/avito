import './Plate.scss';

export default function Plate(props) {
  const { style } = props;

  return (
    <div className="plate" style={style}>{props.children}</div>
  );
}