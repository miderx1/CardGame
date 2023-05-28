import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/user'

const Login = () => {

    const [em,setEm] = useState("")
    const [pass,setPass] = useState("")

    const { user, signIn, loading,signUp } = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/dashboard")
    }, [user])

    if (loading) {
        return <p>carregando ...</p>
    }

    return (
        <>  
            <div id='container'>
            
                <div id='box'>
                    
                    <div id="titulo">Usuário</div>
                    <div id='login'>
                        <div>E-Mail</div>
                        <input type="text" value={em} onChange={(e) => { setEm(e.target.value) }} />
                    </div>
                    <div id='password'>
                        <div>Senha</div>
                        <input type="password" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                    </div>
                    <button id='logar' onClick={() => signIn(em, pass)}>Login</button>
                    <button id='registrar' onClick={() => signUp(em, pass)}>Registrar</button>

                </div>
            </div>
           
            

        </>
    )
}

export default Login