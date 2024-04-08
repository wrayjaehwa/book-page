import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './signup.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.error();
    }
  };

  return (
    <div className="container">
      <div className="drop">
        <div className="content">
          {error && <p>{error}</p>}
          <h1>SignUp</h1>
          <form onSubmit={handleSubmit} className="signup-form">
            {/* INPUT FOR EMAIL */}
            <div className="inputBox">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* INPUT FOR PASSWORD */}
            <div className="inputBox">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* LOGIN BUTTON */}
            <div className="inputBox">
              <button type="submit" className="signup-button">
                Sign-Up
              </button>
            </div>
          </form>

          {/* LOGIN LINK */}
          <div className="login-bubble">
            <Link to="/login">
              <button className="login-button-bubble">Login</button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUp;