import {connect} from 'react-redux';


const Profile = ({isAuthenticated, user}) => {


    const full_name = (user != null) ? user.user.first_name + ' ' +user.user.last_name : null;
    const first_name = (user != null) ? user.user.first_name : null;
    const last_name = (user != null) ? user.user.last_name : null;
    const email = (user != null) ? user.user.email: null;

    return (
        <div className="container">
            <h1>User Profile: {full_name}</h1>
            <h3>First Name: {first_name}</h3>
            <h3>Last Name: {last_name}</h3>
            <h3>Email: {email}</h3>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})


export default connect(mapStateToProps)(Profile);