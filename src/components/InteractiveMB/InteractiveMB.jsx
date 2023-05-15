import { useEffect, useRef, useState } from 'react';
import './InteractiveMB.scss';

export default function InteractiveMB(props) {

  const progressBar = useRef();

  function handler() {
    props.handler(progressBar.current.value);
    const progress = ((props.value - (props.minBar || props.min)) / ((props.maxBar || props.max) - (props.minBar || props.min))) * 100;
    progressBar.current.style.background = `linear-gradient(to right, #fed400 ${progress}%, #fff ${progress}%)`;
  }

  useEffect(() => {
    handler();
  }, [props])

  return (
    <div className="interactiveMB">
      <div className="interactiveMB__title-container">
        <p className="interactiveMB__title">{props.title}</p>
        <p className="interactiveMB__digit">
          <span>{props.price}</span>
          <span> {props.firstTextCurrency}</span>
          <span> ≈ </span>
          <span>{props.pieces}</span>
          <span> {props.secondTextCurrency}</span>
        </p>
      </div>
      <div className="interactiveMB__range">
        <input
          ref={progressBar}
          type="range"
          onInput={handler}
          min={props.minBar || props.min}
          max={props.maxBar || props.max}
          value={props.value}
        />
        <div className="interactiveMB__range-digits">
          <p className="interactiveMB__range-digit">
            <span>{props.min}</span>
            <span> {props.currency && props.currency}</span>
          </p>
          <p className="interactiveMB__range-digit">
            <span>{props.max}</span>
            <span> {props.currency && props.currency}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
