import { Component } from 'react';
import { Auth } from "aws-amplify";

class LogOut extends Component {
    render(){
        this.logout();
        return <div>You are logged out!</div>
    }

    async logout(){
        await Auth.signOut();
    }
}

export default LogOut;