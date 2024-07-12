import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { firebase } = useContext(FirebaseContext);

  const validate = () => {
    let tempErrors = {};
    if (!username) {
      tempErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      tempErrors.username = "Username can only contain letters and numbers";
    }
    if (!email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!phone) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      tempErrors.phone = "Phone number must be 10 digits";
    }

    if (!password) {
      tempErrors.password = "Password is required";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
    }  else if (!/[a-z]/.test(password)) {
      tempErrors.password = "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(password)) {
      tempErrors.password = "Password must contain at least one number";
    } else if (!/[!@#$%^&*]/.test(password)) {
      tempErrors.password = "Password must contain at least one special character";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
        result.user.updateProfile({ displayName: username }).then(() => {
          firebase.firestore().collection('users').add({
            id: result.user.uid,
            username: username,
            phone: phone
          }).then(() => {
            navigate('/login');
          });
        });
      });
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
          />
          {errors.username && <span className="error">{errors.username}</span>}
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
          <br />
          <button type="submit">Signup</button>
        </form>
        <span onClick={() => { navigate('/login') }}>Login</span>
      </div>
    </div>
  );
}
