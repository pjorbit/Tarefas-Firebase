import { useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if(email!=='' && password!=='') {
      await signInWithEmailAndPassword(auth, email, password)
      .then(()=>{
        //navega para /admin
        navigate('/admin', { replace: true });
      })
      .catch((error)=>{
        alert('Deu ruim: '+error);
      })
    } else {
      alert('Preencha todos os campos')
    }
  }

  return(
    <div className='home-container'>
      <h1>Lista de tarefas</h1>
      <span>Gerencie sua agenda de forma fácil</span>
      <form className='form' onSubmit={handleLogin}>
        <input type='email' placeholder='Digite seu email..' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type='password' placeholder='*******' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button type='submit'>Entrar</button>
      </form>

      <Link to='/register' className='button-link'>Criar uma conta</Link>
    </div>
  )
}