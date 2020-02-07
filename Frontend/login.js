import React, { useRef } from 'react';
import Router from 'next/router';
const endpoint = 'http://localhost:1337/auth/local';

export default() =>{
    const loginRef = useRef();
    const pwdRef = useRef();
    const [error, setError ] = React.useState('');


    const login = async() => {
        const identifier = loginRef.current.value;
        const password = pwdRef.current.value;

    try{
        const {jwt,user} = await fetch(endpoint,{
            method: 'POST',
            headers:{
                'Content-type' : 'application/json',
            },
            body: JSON.stringify({
                identifier,
                password,
            }),
        }).then( res=> {
            if (res.status !== 200){
                throw new Error('Error Loggin In, Non 200 Status code received!');
            }
            return res.json();
        });
        window.sessionStorage.setItem('jwt',jwt);
        window.sessionStorage.setItem('user',JSON.stringify(user));
    
       Router.push('/'); //Basically we can redirect user to a specific page after authentication .
        } catch(e){
            setError(e.toString());

        }
};
 
 return(
     <>
 <div style={{display:'flex', flexDirection: 'column', width:300}}>
<input type="text" placeholder="Login"  ref= {loginRef} />
<input type="password" placeholder="Password" ref={pwdRef} />
<button onClick={ () => login()}> Login </button>
</div> 
 {error &&<div style={{border:'1px red solid'}}>{error}</div>}
</>
  );
};