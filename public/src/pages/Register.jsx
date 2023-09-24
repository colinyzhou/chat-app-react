import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { Link, useNavigate} from 'react-router-dom';
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

    const [values,setValues] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
    
    });

    useEffect(() => {
      if (localStorage.getItem("chat-app-user")) {
        navigate("/");
      }
    },[]);
    
    const handleSubmit = async (e) => {
    e.preventDefault();
        if(handleValidation()){
            const { password, username, email } = values;
                const {data} = await axios.post(registerRoute,{
                    username,
                    email,
                    password,
                });
        if(data.status === false){
            toast.error(data.msg, toastOptions);
        }
        if(data.status === true){
            localStorage.setItem("chat-app-user", JSON.stringify(data.user));
            window.location.replace("/");
        }
        navigate("/");
        }
    };

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
          toast.error(
            "Password and confirm password should be same.",
            toastOptions
          );
          return false;
        } else if (username.length < 3) {
          toast.error(
            "Username should be greater than 3 characters.",
            toastOptions
          );
          return false;
        } else if (password.length < 8) {
          toast.error(
            "Password should be equal or greater than 8 characters.",
            toastOptions
          );
          return false;
        } else if (email === "") {
          toast.error("Email is required.", toastOptions);
          return false;
        }
    
        return true;
      };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
      };


  return (
  <>
  <FormContainer>
    <form onSubmit={e => handleSubmit(e)}>
        <div className='brand'>
            <img src={Logo} className="logo" alt="" />
            <h1>snappy</h1>
        </div>
        <input type="text" placeholder='Username' name='username' onChange={e=>handleChange(e)} />
        <input type="email" placeholder='Email' name='email' onChange={e=>handleChange(e)} />
        <input type="password" placeholder='Password' name='password' onChange={e=>handleChange(e)} />
        <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={e=>handleChange(e)} />
        <button type='submit'>Register</button>
        <span>Already have an account? <Link to='/login'>Login</Link></span>
    </form>
  </FormContainer>
  <ToastContainer />
  </>
  )
  
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  align-items: center;
  background: linear-gradient(160deg, #eee, #fff); // 浅色渐变背景
  
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #555;
      text-transform: uppercase;
      font-family: 'Playfair Display', serif;
      letter-spacing: 1px;
      font-weight: 500;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 2rem;
    padding: 3.5rem 5.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease; 
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 7px 20px rgba(0, 0, 0, 0.2);
    }
  }
  
  input {
    background: rgba(0, 0, 0, 0.02);
    padding: 1.2rem;
    border: 0.1rem solid #ccc;
    border-radius: 0.5rem;
    color: #555;
    width: 100%;
    font-size: 1rem;
    font-family: 'Playfair Display', serif;
    transition: border 0.3s ease;
    &:focus {
      border-color: #777;
      outline: none;
    }
  }
  
  button {
    background: linear-gradient(160deg, #aaa, #ccc);
    color: #555;
    padding: 1rem 2rem;
    border: none;
    font-weight: 500;
    cursor: pointer;
    border-radius: 0.5rem;
    font-size: 1rem;
    text-transform: uppercase;
    font-family: 'Playfair Display', serif;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    &:hover {
      background: linear-gradient(160deg, #ccc, #ddd);
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
  }
  
  span {
    color: #555;
    text-transform: uppercase;
    font-family: 'Playfair Display', serif;
    font-weight: 300;
    letter-spacing: 1px;
    a {
      color: #aaa; 
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
      &:hover {
        color: #777;
      }
    }
  }
`;


export default Register;
