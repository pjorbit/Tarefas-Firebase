import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if(email!=='' && password!=='') {
      await createUserWithEmailAndPassword(auth, email, password)
      .then(()=>{
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
      <h1>Cadastre-se</h1>
      <span>Vamos criar sua conta!</span>
      <form className='form' onSubmit={handleRegister}>
        <input type='email' placeholder='Digite seu email..' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type='password' placeholder='*******' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button type='submit'>Cadastre-se</button>
      </form>

      <Link to='/' className='button-link'>Já possui uma conta? Faça login!</Link>
    </div>
  )
}