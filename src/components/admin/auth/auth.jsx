'use client'
import { useState } from "react";


export default function LoginForm(){

    let [login, setLogin] = useState();
    let [password, setPassword] = useState();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    async function doLogin(e){
        e.preventDefault();
        setError('');
        setLoading(true);

        let formData = new FormData();  
        formData.append('login', login);
        formData.append('password', password);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                method: 'POST',
                body: formData  
            });
        } catch (еrror) {
            console.log('Server connection error')
        } finally {
            setLoading(false);
        }
    }

    return <>
    
    <form className="login-form">
      <input type="text" name="login" onChange={(e)=>setLogin(e.target.value)} placeholder="Email/Tel" required disabled={loading}/>
      <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required disabled={loading}/>
      <button type="submit" onClick={doLogin} disabled={loading}>Вход</button>
      <div className="socnets-auth">
        <div className="socnets-auth__title">Войди через:</div>
        <div className="socnets-auth__links">
            <div className="socnets-auth__link socnets-auth__link-vk"></div>
        </div>
      </div>
    </form>
    </>
}