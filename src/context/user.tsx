import { createContext, useEffect, useState } from "react";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as signOutFirebase,
    onAuthStateChanged
} from 'firebase/auth';
import { addDoc, collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import firebaseApp from "../services/firebase";

const UserContext = createContext({})

const UserProvider = ({ children }:any) => {


    const db = getFirestore()


    const auth:any = getAuth();
    const [couldLogin, setCouldLogin] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [ponto, setPonto] = useState(0)
    const [id,setId] = useState("")
    const [win,setWin] = useState(0)
    const [loss,setLoss] = useState(0)
    
    
    useEffect(() => {
        return onAuthStateChanged(auth, listenAuth)
    }, [])

    const listenAuth = (userState: any) => {
        console.log('listenAuth', userState)
        setUser(auth.currentUser)
        setLoading(false)
    }



    const signIn = (email: string, password: string) => {
        console.log('xxx', email, password)
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {

            getDocs(collection(db, 'dados'))
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                console.log(doc.id, ' => ', doc.data());
                 if (doc.data().email == email){
                    setPonto(doc.data().pontos)
                    setId(doc.id)
                    setWin(doc.data().win)
                    setLoss(doc.data().loss)
                    console.log(id)
                    }
                    
              });
            })


        }).catch((error) => {
            console.log('error', error)
            setLoading(false)
        })

    }

    const signUp = (nick: string, email:string, password:string) => {
        let validador = 0
        setLoading(true) 

        getDocs(collection(db, 'dados'))
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    console.log(doc.id, ' => ', doc.data());
                     if (doc.data().user == nick){
                        console.log("Nome de usuário já existente")
                        validador = 1
                        console.log("validador: ",validador)
                        }
                        
                  });
                })

        if (validador < 1){
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const dado = {
                    user: nick,
                    email: email,
                    pontos: 0,
                    win: 0,
                    loss: 0
                }

                setPonto(dado.pontos)
                
                const docref = addDoc(collection(db, "dados"), dado)
                console.log('Usuario cadastrado', userCredential.user);
                setLoading(false);

                getDocs(collection(db, 'dados'))
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    console.log(doc.id, ' => ', doc.data());
                     if (doc.data().email == email){
                        setPonto(doc.data().pontos)
                        setId(doc.id)
                        setWin(doc.data().win)
                        setLoss(doc.data().loss)
                        console.log(id)
                        console.log("win:", doc.data().win, win)
                        }
                        
                  });
                })
            })
            .catch((error) => {
                console.log('error:', error);
                setLoading(false);
            });
        } 
        
    }

    const signOut = (user:any) => {
        setLoading(true)
        console.log('sai!!!')
        
        

        if (id.length < 2){

            console.log("Sem id")
            getDocs(collection(db, 'dados'))
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    console.log(doc.id, ' => ', doc.data());
                     if (doc.data().email == user.email){
                        console.log("id: ", id)
                        setPonto(doc.data().pontos)
                        setId(doc.id)
                        setWin(doc.data().win)
                        setLoss(doc.data().loss)
                        console.log("id: ", id)
                        }
                        
                  });
                })
        }

        const att = {
            pontos: ponto,
            win: win,
            loss: loss
          }
        const documentRef = doc(db, "dados", id);
        
        updateDoc(documentRef, att)
        .then(() => {
            console.log("Documento atualizado com sucesso!")
            console.log(ponto, win, loss)
        })
        .catch((error) => {
            console.error("Erro ao atualizar o documento:", error)
            console.log(ponto)
        });

        signOutFirebase(auth)
            .then(() => {
                console.log("deslogado com sucesso")
                console.log(id)
            }).catch((error) => {
                console.log('error', error)
                setLoading(false)
            })
    }
      

    const incremento = (type: number, ob:any , numero: number) =>{

        //type 0: Ponto
        //type 1: Erros
        //type 2: Acertos

        if(type == 0){
            setPonto(ponto + numero)
        }

        else if(type == 1){
            setLoss(loss + numero) 
            
        }
        else{
            setWin(win + numero)
            console.log("wins: ", win, type, ob, numero)
        }
        
        
    }

    const decremento = (numero: number) =>{
        if (ponto >= numero){
            setPonto(ponto - numero)}
        else{
            setPonto(0)
        }

    }
    return (
        <UserContext.Provider value={{ couldLogin, signIn, signOut,signUp, user,ponto, loading,id,incremento,decremento,win,loss }}>
            {children}
        </UserContext.Provider>
    )
}


export { UserContext, UserProvider }