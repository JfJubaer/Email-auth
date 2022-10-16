import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth,  sendPasswordResetEmail,  signInWithEmailAndPassword } from "firebase/auth";
import app from '../../Firebase/Firebase.init';
import { Link } from 'react-router-dom';


const auth = getAuth(app);
const BootstrapForm = () => {
    const [passError,setPassError]=useState('');
    const [success,setSuccess]=useState(false);
    const [userMail,setUserMail]=useState('');
    const handleSubmit=event=>{
        setSuccess(false);
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const pass = form.password.value;
        if(pass.length < 6){
            setPassError('at least 6 character');
            return;
        }
        if(!/(?=.*[A-Z].*[A-Z])/.test(pass)){
            setPassError('at least 2 upprecase character');
            return;
        }
        if(!/(?=.*?[#?!@$%^&*-])/.test(pass)){
            setPassError('at least 1 special character');
            return;
        }
        setPassError('');
        signInWithEmailAndPassword(auth,email,pass)
        .then(res=>{
            console.log(res.user);
            setSuccess(true);
            form.reset();
        })
        .catch(error=>{
            console.log('errorrr:',error);
            setPassError(error.message);
        });
      }
      const getMail=(event)=>{
        const mail = event.target.value;
        setUserMail(mail);
      }
      const passwordHandle=()=>{
        if(!userMail){
            alert('enter email');
            return;
        }
        sendPasswordResetEmail(auth,userMail)
        .then(()=>{
            alert('pass reset send')
        })
        .catch(error=>console.error(error))
      }

    return (
        <div className='w-50 mx-auto'>
            <Form  onSubmit={handleSubmit}>
                    <h3 className='text-info my-3'>Please Log In</h3>
                    <Form.Group className="mb-3 " controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onBlur={getMail} type="email" name='email' placeholder="Enter email" required/>
                       
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="Password" required/>
                    </Form.Group>
                    <p className='text-danger'>{passError}</p>
                    {success && <p className='text-success'>Sucessfully Logged In</p>}
                    <Button variant="info" type="submit">
                       Log In
                    </Button>
            </Form><br />
            <p>New Here? please <Link  to='/register'>Register</Link></p><br />
            <small>Forget Pass??? <button onClick={passwordHandle} className='btn btn-warning'>Reset pass</button></small>
        </div>
    );
};

export default BootstrapForm;