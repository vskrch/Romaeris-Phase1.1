import React, { useRef } from 'react';
import Router from 'next/router';
const endpoint = 'http://localhost:1337/auth/local/register';

export default() =>{
    const loginRef = useRef();
    const pwdRef = useRef();
    const emailRef = useRef();
    const register = async() => {
        const username = loginRef.current.value;
        const email = emailRef.current.value;
        const password = pwdRef.current.value;
        const {jwt,user} = await fetch(endpoint,{
            method: 'POST',
            headers:{
                'Content-type' : 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        }).then(res => res.json());
        window.sessionStorage.setItem('jwt',jwt);
        window.sessionStorage.setItem('user',JSON.stringify(user));

        console.log({res});
        Router.push('/'); //Basically we can redirect user to a specific page after authentication .
    };
 
 return(
 <div style={{display:'flex', flexDirection: 'column', width:300}}>
<input type="text" placeholder="Login"  ref= {loginRef} />
<input type="email" placeholder="Email" ref={emailRef} />
<input type="password" placeholder="Password" ref={pwdRef} />
<button onClick={ () => register()}> Register </button>
</div> 
  );
};