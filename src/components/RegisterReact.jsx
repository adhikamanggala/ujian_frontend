import React, { Component } from 'react';
import { connect } from 'react-redux'
import { onUserRegister} from '../actions';
import Cookies  from 'universal-cookie';
import { Redirect } from 'react-router-dom'


const cookies = new Cookies();

class RegisterReact extends Component {

    componentWillReceiveProps(newProps) {
        if(newProps.username !== '') {
            cookies.set('dataUser', newProps.username, { path: '/' })// path:'/' gunanya agar cookie bisa di get di setiap page
        }   
    }

    onBtnRegisterClick = () => {
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        var phone = this.refs.phone.value;
        var password = this.refs.password.value;

        this.props.onUserRegister({ username, email, password, phone });

    }
    render() {

        if(this.props.username === "") {

            if(this.props.error) {
                var alert = <p align='center' style={{ fontSize: '14px' }}
                className='alert alert-danger'>{this.props.error}</p>
            }

            var load;
            if(this.props.loading) {
                load = <i className="fa fa-spinner fa-spin" style={{ fontSize: '14px' }}/>
            } else {
                load =  
                <input type="button" className="form-submit" defaultValue="Sign Up" onClick={this.onBtnRegisterClick} />
               
            }

            return (
                // <div className="bodyRegister">
                //     <div className="main">
                //         <div className="container">
                //             <form className="appointment-form" id="appointment-form">
                //                 <h2>Welcome to the Club</h2>
                //                 <div className="form-group-1">
                //                     <input ref="username" type="text" name="name" id="name" placeholder="Username" required />
                //                     <input ref="email" type="email" name="email" id="email" placeholder="Email" required />
                //                     <input ref="phone" type="number" name="phone_number" id="phone_number" placeholder="Phone number" required />
                //                     <input ref="password" type="text" name="password" id="password" placeholder="Password" required />
                //                 </div>
                //                 <div className="form-submit">
                //                     <input type="button" name="submit" id="submit" className="submit" defaultValue="Register" onClick={this.onBtnRegisterClick}/>
                //                 </div>
                //             </form>
                //         </div>
                //     </div>
                // </div>
                <div className="container">
                    <div className="signup-content">
                        <form  id="signup-form" className="signup-form">
                        <h2 className="form-title">create account</h2>
                        <div className="form-group">
                            <input ref="username" type="text" className="form-input" name="name" id="name" placeholder="Your username" required/>
                        </div>
                        <div className="form-group">
                            <input ref="email" type="email" className="form-input" name="email" id="email" placeholder="Your email" required/>
                        </div>
                        <div className="form-group">
                            <input ref="phone" type="number" className="form-input" name="phone_number" id="phone_number" placeholder="Your phone number" required/>
                            <span toggle="#password" className="zmdi zmdi-eye field-icon toggle-password" />
                        </div>
                        <div className="form-group">
                            <input ref ="password" type="text" className="form-input" name="password" id="password" placeholder="Your password" required/>
                        </div>
                        <div className="form-group">
                            <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                            <label htmlFor="agree-term" className="label-agree-term"><span><span /></span>I agree all statements in  <a /*href="#"*/ className="term-service">Terms of service</a></label>
                        </div>
                        <div>
                            {alert}
                        </div>
                        <div className="form-group">
                            {/* <input type="button" name="submit" id="submit" className="form-submit" defaultValue="Sign up" onClick={this.onBtnRegisterClick} /> */}
                            {load}
                        </div>
                        </form>
                        <p className="loginhere">
                        Have already an account ? <a /*href="#"*/ className="loginhere-link">Login here</a>
                        </p>
                    </div>
                </div>

        )
        }return <Redirect to="/"/>
    }
}
const mapStateToProps = (state) => {
    return { username: state.auth.username, error: state.auth.error, loading: state.auth.loading };
}

export default connect(mapStateToProps, { onUserRegister })(RegisterReact);