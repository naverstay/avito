import './TextInput.scss';

export default function TextInput({
  placeholder,
  maxLength = 200,
  value,
  onChange,
  style = {},
  onKeyDown = () => { },
}) {
  return (
    <input
      maxLength={maxLength || 200}
      style={style}
      type="text"
      className="textinput"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      onKeyDown={onKeyDown}
    />
  );
}
