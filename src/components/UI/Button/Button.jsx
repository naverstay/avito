import './Button.scss';

export default function Button({ title, classes = [], style = {}, onClick = () => { } }) {
  // classes: [outlined, small, wide]

  return (
    <button style={style} className={'button ' + classes.join(' ')} onClick={onClick}>
      {title}
    </button>
  );
}
