import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


const Home = ({isAuthenticated, user}) => {

    const name = (user != null) ? user.user.first_name + ' ' +user.user.last_name : null;


    return(
        <div className='container'>
            {console.log(user)}
            <div className="p-5 mb-5 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Home Page {name}</h1>
                    <p className="col-md-8 fs-4"> Using a series of utilities, you can create this hantan Ajaira Jinish Anytime</p>

                    {isAuthenticated ? null: <Link className="btn btn-primary btn-lg" to="/login">Login</Link>}
                </div>
            </div>
        </div>
    )
    
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(Home);