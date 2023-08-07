import Plate from 'components/UI/Plate/Plate';
import './InteractivePlateText.scss';
import {InteractivePlateStep2} from "../InteractivePlateStep/InteractivePlateStep2";

export default function InteractivePlateSettings() {
  const plateStyle = {
    padding: '25px 60px',
    marginBottom: '76px',
    gridArea: 'a',
    width: '100%',
  };

  return (
    <Plate style={plateStyle}>
      <InteractivePlateStep2/>
    </Plate>
  );
}
