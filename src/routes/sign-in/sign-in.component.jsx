import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  };

  return (
    <div className="sign-in">
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
