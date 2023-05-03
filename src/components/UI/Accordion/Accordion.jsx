import { useEffect, useRef, useState } from 'react';
import './Accordion.scss';

export default function Accordion(props) {
  const { title, text } = props;

  const [isActive, setIsActive] = useState(false);
  function handler() {
    setIsActive(!isActive);
  }

  const ref = useRef();
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(ref.current.scrollHeight);
  }, []);
  const textStyle = {
    paddingBottom: '30px',
    height
  }

  return (
    <div className={"accordion " + (isActive ? '_active' : '')} onClick={handler}>
      <p className="accordion__title">{title}</p>
      <p ref={ref} className="accordion__text" style={isActive ? textStyle : {}}>{text}</p>
    </div>
  );
}