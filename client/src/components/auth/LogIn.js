import React, { Component } from 'react';
import FormErrors from "../utils/form-errors";
import Validate from "../utils/form-validation";
import { Auth } from "aws-amplify";
import babypets from '../../assets/babypets.jpg'
import "../Header.css"

class LogIn extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    // We put the Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // Here we have the AWS Cognito integration
    try {
      const user = await Auth.signIn(this.state.username, this.state.password);
      console.log(user);
      this.props.auth.setAuthStatus(true);
      this.props.auth.setUser(user);
      this.props.history.push("/");
    }catch(error) {
      let err = null;
      !error.message ? err = { "message": error } : err = error;
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      });
    }
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <section className="section auth text-center">
        <div className="text-center">
          <h1 className="loginTop">Login</h1>
          <FormErrors formerrors={this.state.errors} />

          <form className={"text-center"} onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control">
                <input 
                  className="input" 
                  type="text"
                  id="username"
                  aria-describedby="usernameHelp"
                  placeholder="Enter username or email"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
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
              <p className="control">
                <a href="/register">Register</a> &nbsp;
                <a href="/forgotpassword">Forgot password?</a>
              </p>
            </div>
            <div className="field container">
              <p className="control">
                <button className="button is-success btn btn-success col-2">
                  Login
                </button>
              </p>
            </div>
          </form>
          <img  className={"img-fluid"} src={babypets} width="1000" height="1000"/>
        </div>
      </section>
    );
  }
}

export default LogIn;
