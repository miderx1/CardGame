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

const UserProvider = ({ children }) => {


    const db = getFirestore(firebaseApp)


    const auth = getAuth();
    const [couldLogin, setCouldLogin] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [ponto, setPonto] = useState(0)
    const [id,setId] = useState("")
    
    
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
                    console.log(id)
                    }
                    
              });
            })


        }).catch((error) => {
            console.log('error', error)
            setLoading(false)
        })

    }

    const signUp = (email:string, password:string) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const dado = {
                    email: email,
                    pontos: 0
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
                        console.log(id)
                        }
                        
                  });
                })
            })
            .catch((error) => {
                console.log('error:', error);
                setLoading(false);
            });
    }

    const signOut = () => {
        console.log('sai!!!')
        setLoading(true)

        const att = {
            pontos: ponto
          }
        const documentRef = doc(db, "dados", id);
        
        updateDoc(documentRef, att)
        .then(() => {
            console.log("Documento atualizado com sucesso!")
            console.log(ponto)
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
      

    const incremento = (ponto1: number) =>{
        setPonto(ponto + ponto1)
        
    }

    const decremento = (ponto1: number) =>{
        if (ponto >= ponto1){
            setPonto(ponto - ponto1)}
        else{
            setPonto(0)
        }

    }
    return (
        <UserContext.Provider value={{ couldLogin, signIn, signOut,signUp, user,ponto, loading,id,incremento,decremento }}>
            {children}
        </UserContext.Provider>
    )
}


export { UserContext, UserProvider }