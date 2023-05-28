import { useContext, useState } from 'react';
import './style.css';
import { UserContext } from '../../context/user';

export default function Card({ content }) {
  const [isOpened, setIsOpened] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const {incremento, decremento} = useContext<any>(UserContext)

  return (
    <div
      className={isOpened ? "card card-opened" : "card"}
      onClick={() => {
        if (showPopup == false && isOpened == false){
            setShowPopup(true)}
      }}
    >
      <div className="content">
        <div className="front">{content.front}</div>
        <div className="back">{content.back}</div>
      </div>

      {showPopup && (
        <div className="popup">
            <div className="box">
                <div className ="texto">Digite a palavra em inglês</div>
                <input 
                    className="input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="button" onClick={() => {
                    const inputValueLowerCase = inputValue.toLowerCase();
                    const contentBackLowerCase = content.back.toLowerCase();
                    
                    if (inputValueLowerCase === contentBackLowerCase) {
                        incremento(10)
                    }else{
                        decremento(10)
                    }

                    setIsOpened(!isOpened)
                    setShowPopup(false)
                    
                    
                    }}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
}

