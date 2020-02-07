//in pages( frontend) Welcome page the Index page
import Router from 'next/router';
import react,{useEffect} from 'react';


export default () => {
    useEffect(()=>{
        const jwt = window.sessionStorage.getItem('jwt');
        if(!jwt) {
            Router.push('/login'); //If user session is missing redirect to Login page.
        }
    },[]);
    return (
    <div> This is the Homepage!</div>
    );
};