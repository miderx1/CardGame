import { Link } from 'react-router-dom'
import './style.css'
import { useContext } from 'react'
import { UserContext } from '../../context/user'


const Dashboard = () => {

    const { signOut, user,ponto, win, loss } = useContext<any>(UserContext)
    const nick = user.email.split('@')[0];

    return (
        <>
        <div className="container">
            <div className="box">

                <h1 id="title">{nick}</h1>
                    <>
                        <div id="pontos">Pontuação:{ponto}</div>
                        <div id="wins">{win}</div>
                        <div id="loses">{loss}</div>
                        <div id="win_loss">Acertos Erros</div>

                    </>
                    <Link to="/game"><button className='play'>JOGAR</button></Link>
                <button className="sair" onClick={() => signOut(user)}>Sair</button>  

            </div>
        </div>
           
        </>
    )
}
export default Dashboard