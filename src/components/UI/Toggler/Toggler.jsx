import './Toggler.scss';

export default function Toggler({ isActive }) {
  return (
    <button className={'toggler ' + (isActive ? '_active' : '')}>
      <div className="toggler__thumb"></div>
    </button>
  );
}
