import { Link } from 'react-router-dom'
import './style.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/user'

import firebaseApp from '../../services/firebase'

import { getFirestore, addDoc, collection, getDocs, onSnapshot, query } from 'firebase/firestore'

const Dashboard = () => {

    const { signOut, user,ponto } = useContext<any>(UserContext)

    return (
        <>
        <div id="container">
            <div id="box">

                <h1>Dashboard</h1>
                    <>
                        <div>{user.email}</div>
                        <div>Pontuação:{ponto}</div>
                    </>
                <Link to="/game">JOGAR!</Link>
                <div onClick={() => signOut()}>Deslogar</div>  

            </div>
        </div>
           
        </>
    )
}

export default Dashboard