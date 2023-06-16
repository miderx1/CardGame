import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/user'

const Login = () => {

    const [em,setEm] = useState("")
    const [pass,setPass] = useState("")

    const { user, signIn, loading, signUp } = useContext<any>(UserContext)
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
                <div className='box'>

                    <div id="titulo">Login</div>
                    <div id='login'>
                        <div className='Log'>E-Mail</div>
                        <input id='input' type="text" value={em} onChange={(e) => { setEm(e.target.value) }} />
                    </div>
                    <div id='password'>
                        <div className='Log'>Senha</div>
                        <input id= 'input' type="password" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                    </div>
                    <button id='logar' onClick={() => signIn(em, pass)}>Login</button>
                    <button id='registrar' onClick={() => signUp(em, pass)}>Registrar</button>

                </div>
            </div>
           
            

        </>
    )
}

export default Login