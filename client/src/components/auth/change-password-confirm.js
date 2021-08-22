import React, { Component } from "react";
import { Auth } from "aws-amplify";

class ChangePasswordConfirmation extends Component {
  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Change Password</h1>
          <p>Your password has been successfully updated!</p>
        </div>
      </section>
    );
  }
}

export default ChangePasswordConfirmation;