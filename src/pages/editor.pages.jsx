import { useContext } from 'react'
import { UserContext } from '../App';
import { Navigate } from 'react-router-dom';

const Editor = () => {
  let { userAuth: { access_token }} = useContext(UserContext);

  return (
    <>
      {
        access_token == null ? <Navigate to="/sign-in" /> :
        <h1>You can access the Editor Page</h1>
      }
    </>
  )
}

export default Editor;