// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';

import {
  // auth,
  signInWithGooglePopup,
  // createUserProfileDocument, 
  createUserDocumentFromAuth,
  // signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../Components/sign-up-form/sign-up-form';


const SignIn = () => {


        //To signin with google redirect
  // useEffect(async () =>{
  //   const response = await getRedirectResult(auth);

  //   if(response){
  //     const useDocRef = await createUserDocumentFromAuth(response.user);
  //   }
  // }, [])
   
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    // createUserProfileDocument(response);
  };



  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
      <SignUpForm/>
    </div>
  );
};

export default SignIn;
