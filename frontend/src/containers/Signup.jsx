import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {signup} from '../actions/auth';
import './../App.css';

const Signup = ({signup, isAuthenticated}) => {
    const [accountCreated, setAccountCreated] = useState(false);
    
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const {first_name, last_name, email, password, confirm_password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if(password === confirm_password) {
            signup(first_name, last_name, email, password, confirm_password);
            setAccountCreated(true);
        }
    }

    if(isAuthenticated){
        return <Redirect to="/"/>
    }

    if(accountCreated){
        return <Redirect to="/login"/>
    }


    return (
        <div className="container mt-5">
            <h1>Sign Up</h1>
            <p>Register for your new account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="">First Name</label>
                    <input
                        className="form-control"
                        type="text"
                        name="first_name"
                        value={first_name}
                        onChange={e => onChange(e)}
                        placeholder="First Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Last Name</label>
                    <input
                        className="form-control"
                        type="text"
                        name="last_name"
                        value={last_name}
                        onChange={e => onChange(e)}
                        placeholder="Last Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input
                        className="form-control"
                        type="text"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input
                        className="form-control"
                        placeholder="Enter Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Confirm Password</label>
                    <input
                        className="form-control"
                        placeholder="Confirm Your Password"
                        type="password"
                        name="confirm_password"
                        value={confirm_password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary for-login" type="submit">Sign Up</button>
                </div>
            </form>
            <p className="mt-3">
                Already have an account? <Link to="/login">Signup</Link>
            </p>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})


export default connect(mapStateToProps, {signup})(Signup);