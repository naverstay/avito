import {InteractivePlateControls} from '../InteractivePlateControls/InteractivePlateControls';
import {InteractivePlateStep} from '../InteractivePlateStep/InteractivePlateStep';
import InteractivePlateText from '../InteractivePlateText/InteractivePlateText';
import InteractivePlateSettings from "../InteractivePlateText/InteractivePlateSettings";
import './Interactive.scss';

export default function Interactive() {
  return (
    <div className="interactive">
      <h3 className="interactive_title">Шаг 1</h3>
      <InteractivePlateText/>

      <h3 className="interactive_title">Шаг 2</h3>
      <InteractivePlateSettings/>

    </div>
  );
}
