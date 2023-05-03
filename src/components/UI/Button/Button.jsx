import './Button.scss';

export default function Button(props) {
  // classes: [outlined, small, wide]
  const { title, classes = [] } = props;

  return(
    <button className={"button " + classes.join(' ')}>{title}</button>
  );
}