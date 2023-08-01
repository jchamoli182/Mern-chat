import React, { useContext } from 'react'
import Register from './Register'
import { UserContext } from './userContext'

const Routes = () => {

  const {username,id} = useContext(UserContext);
  if(username){
    return 'logged in!';
  }
  return (
    <Register />
  )
}

export default Routes;