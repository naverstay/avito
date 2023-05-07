import './TextInput.scss';

export default function TextInput({
  data,
  onChange,
  style = {},
  onKeyDown = () => { },
}) {
  return (
    <input
      maxLength={data.maxLength || 200}
      style={style}
      type="text"
      className="textinput"
      placeholder={data.placeholder}
      onChange={onChange}
      value={data.value}
      onKeyDown={onKeyDown}
    />
  );
}
