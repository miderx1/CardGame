import './style.css'
import Card from '../../components/Card'
import Xp from '../../components/Xp'
import { useState,useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { UserContext } from '../../context/user'

const Game = () => {

    const { ponto } = useContext<any>(UserContext)

    const [cards, setCards] = useState([])

    useEffect(() => {
        const buscaCards = async () => {
          try {
            const db = getFirestore();
            const cardsCollection = collection(db, 'cards')
            const querySnapshot = await getDocs(cardsCollection)
            const dbCards:any = querySnapshot.docs.map((doc) => doc.data());
            setCards(dbCards);
          } catch (error) {
            console.error('Erro ao obter os cards:', error)
          }
        };
        buscaCards();
      }, []);

    return (
        <>
            <div id="container-topo">
                <div className='titulo'>FlashCard Challenge</div>
                <Link id="voltar" to="/dashboard"><button className='play'>VOLTAR</button></Link>
                <Xp total={ponto} />
            </div>
            <div id="container-cards">
                {cards.map((card => <Card content={card} />))}
            </div>
        </>
    )
}

export default Game