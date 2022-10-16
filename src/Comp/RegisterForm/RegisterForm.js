import React from 'react';

const RegisterForm = () => {
    const handleSubmit=event=>{
        event.preventDefault();
        const email = event.target.email.value;
        const pass = event.target.password.value;
        console.log(email,pass);
      }
      const handleEmail = event =>{
        console.log(event.target.value)
      }
      const handlePass = event =>{
        console.log(event.target.value)
      }
    return (
        <div> <form onSubmit={handleSubmit}>
        <input onBlur={handleEmail}  type='email' name="email" placeholder='Email'></input><br />
        <input onBlur={handlePass} type='password' name="password" placeholder='Password'></input><br />
        <button type="submit">Register</button>
        </form>
        </div>
    );
};

export default RegisterForm;