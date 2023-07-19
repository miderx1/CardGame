import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/user'

const SignUp = () => {

    const [em,setEm] = useState("")
    const [pass,setPass] = useState("")
    const [nick,setNick] = useState("")
    

    const { user, loading, signUp } = useContext<any>(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/dashboard")
    }, [user])

    if (loading) {
        return <p>carregando ...</p>
    }

    return (
        <>  
            <div className='container'>
                <div className='cad_box'>

                    <div id="cad_title">Cadastro</div>
                    <div id='cad_user'>
                        <div className='Log'>Usuário</div>
                        <input id= 'input' type="text" value={nick} onChange={(e) => { setNick(e.target.value) }} />
                    </div>
                    <div id='cad_email'>
                        <div className='Log'>E-Mail</div>
                        <input id='input' type="text" value={em} onChange={(e) => { setEm(e.target.value) }} />
                    </div>
                    <div id='cad_pass'>
                        <div className='Log'>Senha</div>
                        <input id= 'input' type="password" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                    </div>
                    <Link id="cad_logar" to="/Login">Já possuo uma conta</Link>
                    <button id='registrar' onClick={() => signUp(nick, em, pass)}>Registrar</button>

                </div>
            </div>
           
            

        </>
    )
}

export default SignUp