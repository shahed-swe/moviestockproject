import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../actions/auth';
import './../App.css';



const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    const {email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});


    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    }


    if(isAuthenticated){
        return <Redirect to='/'/>
    }

    return (
        <div className='container'>
            <h1>Sign in</h1>
            <p>Sign into your account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input
                        className="form-control"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary for-login" type="submit">Login</button>
                </div>
            </form>
            <p className="mt-3">
                Don't have an account? <Link to="/signup">Signup</Link>
            </p>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);