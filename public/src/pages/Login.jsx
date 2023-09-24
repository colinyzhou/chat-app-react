import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { Link, useNavigate} from 'react-router-dom';
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
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
        password:'',
    
    });

    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
          navigate("/");
        }
      },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
          const { password, username } = values;
          try {
            const { data } = await axios.post(loginRoute, {
              username,
              password,
            });
            if (data.status === false) {
              toast.error(data.msg, toastOptions);
            } else if (data.status === true) {
              localStorage.setItem("chat-app-user", JSON.stringify(data.user));
              navigate("/");
            }
          } catch (error) {
            toast.error("Something went wrong!", toastOptions);
          }
        }
      };
      
      const handleValidation = () => {
        const { password, username } = values;
        if (!password) {
          toast.error("Password is required.", toastOptions);
          return false;
        }
        if (!username) {
          toast.error("Username is required.", toastOptions);
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
        <input type="text" placeholder='Username' name='username' onChange={e=>handleChange(e)} min="3" />
        <input type="password" placeholder='Password' name='password' onChange={e=>handleChange(e)} />
        <button type='submit'>Login</button>
        <span>Don't have an account? <Link to='/register'>Register</Link></span>
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


export default Login;
