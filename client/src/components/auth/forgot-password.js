import React, { Component } from 'react';
import FormErrors from "../utils/form-errors";
import Validate from "../utils/form-validation";
import { Auth } from 'aws-amplify';
import forgot from '../../assets/forgot.jpg'
import "../Header.css"

class ForgotPassword extends Component {
  state = {
    email: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  }

  forgotPasswordHandler = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    try {
      await Auth.forgotPassword(this.state.email);
      this.props.history.push('/forgotpasswordverification');
    }catch(error) {
      console.log(error);
    }
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1 className="text-center loginTop">Forgot your password?</h1>
          <p className="text-center">
            Please enter the email address associated with your account and we'll
            email you a password reset link.
          </p>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.forgotPasswordHandler}>
            <div className="field text-center">
              <p className="control has-icons-left has-icons-right">
                <input
                  type="email"
                  className="input centeredLogin"
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
            <div className="field text-center">
              <p className="control text-center">
                <a className="text-center" href="/forgotpassword">Forgot password?</a>
              </p>
            </div>
            <div className="field text-center">
              <p className="control">
                <button className="button is-success btn btn-success col-2">
                  Submit
                </button>
              </p>
            </div>
          </form>
          {/* <img  className={"img-fluid"} src={forgot} width="800" height="800"/> */}
        </div>
      </section>
    );
  }
}

export default ForgotPassword;
