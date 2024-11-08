
import Header from "../Components/Header.jsx";
import '../Styles/Login.css'
import {useState} from 'react';

/**
 * This is the login page.
 */
function Login() {

    /**
     * Stores whether to show login or signup.
     * True - show login form, otherwise show signup form
     */
    const [hasAccount, setHasAccount] = useState(true);


    const getTitle = (isLogin) => (isLogin) ? 'Login' : 'Signup';

    const handleFormChangeClick = () => setHasAccount(prev => !prev);


    function renderBottom() {
        let message;
        if (hasAccount) {
            message = `Don't have an account`;
        }else {
            message = 'Already have an account';
        }

        return (
            <div className='bottom-container'>
                    <span>{message}
                        <button onClick={handleFormChangeClick}>
                            {getTitle((!hasAccount))}</button></span>
            </div>
        )
    }



    return (
        <>
            <Header/>
            <div className='login-container'>
                <h1>{getTitle(hasAccount)}</h1>

                <input placeholder='Email'></input>
                <input placeholder='Password'></input>

                <button id='sign-in-button'>{getTitle(hasAccount)}</button>
                {
                    renderBottom()
                }
            </div>
        </>
    )
}

export default Login;