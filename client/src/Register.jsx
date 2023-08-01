import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { UserContext } from './userContext';


const Register = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const { setUsername : setLoggedInUsername, setId } = useContext(UserContext);

    function setPasswordHandler(ev){

        setPassword(ev.target.value);

    }

    function setUserNameHandler(ev){
        setUsername(ev.target.value);
    }

    async function register(ev) {
      ev.preventDefault(); 
      const {data} = await axios.post('/register',{username,password});
      setLoggedInUsername(username);
      setId(data.id);  
    }

    // function register(ev) {
    //   ev.preventDefault(); 
    //   axios.post('/register', { username, password })
    //     .then(({ data }) => {
    //       loggedInUsername(username); // This should correctly call the setUserName function from the context
    //       setId(data.id);
    //     })
    //     .catch((error) => {
    //       console.error('Error during registration:', error);
    //     });
    // }
      
    
    

  return (
    <div className='bg-blue-50 h-screen flex items-center'>
      <form className='w-64 mx-auto mb-12' onSubmit={register}>     
        <input type='text' placeholder='username' className='block w-full rounded-sm p-2 mb-2 border' value={username} onChange={setUserNameHandler}></input>
        <input type='password' placeholder='password' className='block w-full rounded-sm p-2 mb-2 border' value={password} onChange={setPasswordHandler}></input>
        <button className='bg-blue-500 block w-full rounded-sm p-2'>Register</button>
      </form>
    </div>
  )
}

export default Register