import './TableHead.scss';
import hearticon from 'assets/images/hearticon.svg';
import humanicon from 'assets/images/humanicon.svg';
import staricon from 'assets/images/staricon.svg';

export default function TableHead() {
  return (
    <div className='tablehead'>
      <div className="_bold">Черновики</div>
      <div>URL</div>
      <div>Статус</div>
      <div><img style={{ width: 16 }} src={hearticon} alt='heart' /></div>
      <div><img style={{ height: 17 }} src={humanicon} alt='human' /></div>
      <div><img src={staricon} alt='star' /></div>
      <div className='_price'>Сумма</div>
      <div></div>
    </div>
  );
}