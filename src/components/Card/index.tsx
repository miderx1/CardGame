import { useContext, useState } from 'react';
import './style.css';
import { UserContext } from '../../context/user';

export default function Card({ content }:any) {
  const [isOpened, setIsOpened] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const {incremento, decremento,Win,ponto} = useContext<any>(UserContext)
  const [score,setScore] = useState("")
  const [correct,setCorrect] = useState(false)

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
        <div className="back">
          <div className={correct ? 'green_score' : 'red_score'}>{score}</div>
          {content.back}  
        </div>
      </div>

      {showPopup && (
        <div className="popup">
            <div className="caixa">
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
                      incremento(0, ponto, 10)
                      incremento(2, ponto, 1)
                      setScore("+10 Pontos")
                      setCorrect(true)
                      console.log("win:",Win)
                    }else{
                      decremento(10)
                      incremento(1, ponto, 1)
                      setScore("-10 Pontos")
                      setCorrect(false)
                        
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

