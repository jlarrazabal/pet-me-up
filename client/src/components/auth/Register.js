import React, { Component } from 'react';
import FormErrors from "../utils/form-errors";
import Validate from "../utils/form-validation";
import { Auth } from "aws-amplify";
import welcome from '../../assets/welcome.png'
import "../Header.css"

class UserRegister extends Component {
    state = {
        firstname:"",
        lastname:"",
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        errors: {
            cognito: null,
            blankfield: false,
            passwordmatch: false
    }
}

clearErrorState = () => {
    this.setState({
        errors: {
            cognito: null,
            blankfield: false,
            passwordmatch: false
        }
    });
}

handleSubmit = async event => {
    event.preventDefault();
    //form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
        this.setState({
            errors: { ...this.state.errors, ...error}
        });
    }
    //AWS Cognito integration
    const { username, email, password } = this.state;
    try {
        const signUpResponse = await Auth.signUp({
            username,
            password,
            attributes: {
                email: email
            }
        });
        console.log(signUpResponse);
        //here we redirect with react 
        this.props.history.push("/welcome");
    }catch(error) {
        let err = null;
        !error.message ? err = { "message": error } : err = error;
        this.setState({
            errors: {
                ...this.state.errors, 
                cognito: err
            }
        })

    }
};

onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }


  render() {
    return (
      <section className="section auth">
        <div className="container-fluid text-center">
          <h1 className="loginTop">Register</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.handleSubmit}>
          <div className="field">
              <p className="control">
                <input 
                  className="input" 
                  type="text"
                  id="firstname"
                  aria-describedby="firstNameHelp"
                  placeholder="Enter Firstname"
                  value={this.state.firstname}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input 
                  className="input" 
                  type="text"
                  id="lastname"
                  aria-describedby="lastNameHelp"
                  placeholder="Enter Lastname"
                  value={this.state.lastname}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input 
                  className="input" 
                  type="text"
                  id="username"
                  aria-describedby="userNameHelp"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right text-center">
                <input 
                  className="input centeredLogin" 
                  type="email"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input centeredLogin" 
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input centeredLogin" 
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm password"
                  value={this.state.confirmpassword}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <a href="/forgotpassword">Forgot password?</a>
              </p>
            </div>
            <div className="field container">
              <p className="control">
                <button className="button is-success btn btn-success col-2">
                  Register
                </button>
              </p>
            </div>
          </form>
          <img  className={"img-fluid"} src={welcome} width="900" height="900"/>
        </div>
      </section>
    );
  }
}

export default UserRegister;