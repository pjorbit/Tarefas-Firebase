import { useState, useEffect } from 'react';
import './style.css';
import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc  } from 'firebase/firestore';

export default function Admin() {
    const [ tarefaInput, setTarefaInput] = useState('');
    const [ user, setUser ] = useState({});
    const [ tarefas, setTarefas ] = useState([]);
    const [ edit, setEdit ] = useState({});

    useEffect(()=>{
        async function loadingTarefas() {
            const userDetail = localStorage.getItem("@detailUser");
            setUser(JSON.parse(userDetail));

            if(userDetail) {
                const data = JSON.parse(userDetail);
                const tarefaRef = collection(db, "tarefas");
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid));

                const unsub = onSnapshot(q, (snapshot)=>{
                    let lista = [];

                    snapshot.forEach((doc)=>{
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })
                    setTarefas(lista);
                })
            }
        }

        loadingTarefas()
    }, [])

    async function handleRegister(e) {
        e.preventDefault();
        if(tarefaInput==='') {
            alert('Você não digitou sua tarefa!');
            return;
        }

        if(edit?.id) {
            handleUpdateTarefa();
            return;
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
        .then(()=>{
            alert("Tarefa registrada!");
            setTarefaInput('');
        })
        .catch((error)=>{
            alert("Deu ruim: "+error)
        })
    }

    async function handleLogout() {
        await signOut(auth);
    }

    async function handleDeleteTarefa(id) {
        const docRef = doc(db, "tarefas", id);
        await deleteDoc(docRef);
    }

    function handleEditTarefa(item) {
        setTarefaInput(item.tarefa);
        setEdit(item);
    }

    async function handleUpdateTarefa() {
        const docRef = doc(db, "tarefas", edit?.id);
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })
        .then(()=>{
            alert("Tarefa atualizada!");
            setTarefaInput('');
            setEdit({});
        })
        .catch((error)=>{
            alert("Deu ruim: "+error);
            setTarefaInput('');
            setEdit({});
        })
    }

    return(
        <div className='admin-container'>
            <h2>Minhas tarefas</h2>
            <form className='form' onSubmit={handleRegister}>
                <textarea placeholder='Digite sua tarefa..' value={tarefaInput} onChange={(e)=>setTarefaInput(e.target.value)}/>

                {Object.keys(edit).length > 0 ? (
                    <button type='submit' className='btn-register' style={{ backgroundColor: '#FE4365'}}>Atualizar tarefa</button>
                ) : (
                    <button type='submit' className='btn-register'>Registrar tarefa</button>
                )}
            </form>

            {tarefas.map((item)=>(
                <article key={item.id} className='list'>
                    <p>{item.tarefa}</p>
                    <div>
                        <button onClick={() => handleEditTarefa(item)}>Editar</button>
                        <button onClick={() => handleDeleteTarefa(item.id)} className='btn-delete'>Concluir</button>
                    </div>
                </article>
            ))}

            <button className='btn-logout' onClick={handleLogout}>Sair</button>
        </div>
    )
}