import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../Firebase/Firebase.init';
import { Link } from 'react-router-dom';


const auth = getAuth(app);
const ReactBootstrapForm = () => {
    const [passError,setPassError]=useState('');
    const [success,setSuccess]=useState(false);
    function updateUserName(name){
        updateProfile(auth.currentUser,{
            displayName : name
        })
        .then(()=>{
            console.log('updated name')
        })
        .catch(error=>console.log(error))
    }
    const handleSubmit=event=>{
        setSuccess(false);
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const pass = form.password.value;
        const name = form.name.value;
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
        createUserWithEmailAndPassword(auth,email,pass)
        .then(res=>{
            console.log(res.user);
            setSuccess(true);
            form.reset();
            verifyEmail();
            updateUserName(name);
        })
        .catch(error=>{
            console.log('errorrr:',error);
            setPassError(error.message);
        });
      }
      const verifyEmail = ()=>{
        sendEmailVerification(auth.currentUser)
        .then(()=>{
            alert('please verify your Email')
        })
      }
    return (
        <div className='w-50 mx-auto'>
            <Form  onSubmit={handleSubmit}>
                    <h3 className='text-primary my-3'>Please Register</h3>
                    <Form.Group className="mb-3 " controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name='name' placeholder="Enter Name" required/>
                       
                    </Form.Group>
                    <Form.Group className="mb-3 " controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' placeholder="Enter email" required/>
                       
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="Password" required/>
                    </Form.Group>
                    <p className='text-danger'>{passError}</p>
                    {success && <p className='text-success'>Sucessfully Registered</p>}
                    <Button variant="primary" type="submit">
                       Register
                    </Button>
            </Form><br />
            <p>Already have an account? Please <Link  to='/login'>Log in</Link></p>
        </div>
    );
};

export default ReactBootstrapForm;