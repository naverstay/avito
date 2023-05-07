import './Phrase.scss';
import TextInput from 'components/UI/TextInput/TextInput';
import { useState } from 'react';
import PhraseTag from '../PhraseTag/PhraseTag';

export default function Phrase() {
  const [phrase, setPhrase] = useState({
    value: '',
    placeholder: 'Поисковая фраза для продвижения на Авито',
  });

  const [phrases, setPhrases] = useState([]);

  function phrasehandler(e) {
    if (e.type === 'keydown' && e.code === 'Enter') {
      return addPhrase();
    }
    setPhrase({ ...phrase, value: e.target.value });
  }

  function addPhrase() {
    if (phrase.value.length > 0) {
      setPhrases([...phrases, phrase.value]);
      // очистка поля
      setPhrase({ ...phrase, value: '' });
    }
  }

  function removePhrase(e) {
    if (e.target.className.includes('close')) {
      const target = e.target.previousElementSibling;
      setPhrases(phrases.filter((i) => i !== target.textContent));
    }
  }

  const phrasesStyle = { marginBottom: 30 };

  return (
    <div className="formstep__phrase">
      <div
        className="formstep__phrase-container"
        style={phrases.length ? phrasesStyle : {}}
      >
        <TextInput
          data={phrase}
          onChange={phrasehandler}
          onKeyDown={phrasehandler}
        />
        <button
          onClick={addPhrase}
          className="formstep__phrase-button"
        ></button>
      </div>
      <div className="formstep__phrase-tags" onClick={removePhrase}>
        {phrases.map((i, ind) => (
          <PhraseTag key={ind} title={i} />
        ))}
      </div>
    </div>
  );
}
