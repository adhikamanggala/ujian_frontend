import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import Cookies  from 'universal-cookie';
import { onUserLogin } from '../actions';

const cookies = new Cookies();

class LoginReact extends Component {

    componentWillReceiveProps(newProps) {
        if(newProps.username !== '') {
            cookies.set('dataUser', newProps.username, { path: '/' })// path:'/' gunanya agar cookie bisa di get di setiap page
        }   
    }

    onBtnLoginClick = () => {
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        this.props.onUserLogin({username, password})
    }
    
        render () {

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
                    <input type="button" className="form-submit" defaultValue="Login" onClick={this.onBtnLoginClick} />
                   
                }

                return (
                    // <div className='loginStyle'>
                    
                    //     <Form style={{ margin: "0 auto"}} className="col-3">
        
                    //         <FormGroup>
                    //         <Label for="exampleUsername"></Label>
                    //         <Input type="text" name="username" ref="username" innerRef="tbUsername" id="exampleUsername" placeholder="Username" />
                    //         </FormGroup>
                    //         <FormGroup>
                    //         <Label for="examplePassword"></Label>
                    //         <Input type="password" name="password" ref="password" innerRef="tbPassword" id="examplePassword" placeholder="Password" />
                    //         </FormGroup>

                            
                    //         {alert}
                    //         {load}

                    //         <p style={{color:'red'}}>{this.props.error}</p> / atau bisa pake ini 
                        
                          
        
                    //     </Form>
                    // </div>
                    
                    <div className="container">
                        <div className="signup-content">
                            <form  id="signup-form" className="signup-form">
                            <h2 className="form-title">login account</h2>
                            <div className="form-group">
                                <input ref="username" type="text" className="form-input" name="username" id="exampleUsername" placeholder="Your username" required/>
                            </div>
                            <div className="form-group">
                                <input ref="password" type="password" className="form-input" name="password" id="examplePassword" placeholder="Your password" required/>
                            </div>
                            <div className="form-group">
                            {alert}
                            {load}
                            </div>
                            </form>
                        
                        </div>
                    </div>
                );
            }
        
        return <Redirect to="/"/>
        
    }
}


const mapStateToProps = (state) => {
    return { username: state.auth.username, error: state.auth.error };
}   

export default connect(mapStateToProps, { onUserLogin })(LoginReact);