import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Auth } from 'aws-amplify';
import Home from "./components/Home";
import LogIn from './components/auth/LogIn';
import LogOut from './components/auth/Logout';
import UserRegister from './components/auth/Register';
import Welcome from './components/auth/Welcome';
import ForgotPassword from './components/auth/forgot-password';
import ForgotPasswordVerification from './components/auth/forgot-password-verification';
import ChangePassword from './components/auth/change-password';
import ChangePasswordConfirm from './components/auth/change-password-confirm';
import Dashboard from "./components/Dashboard";
import PetRegistration from './components/pet-registration';
import Appointment from "./components/Appointment";
import Success from "./components/Success";
import Pethistory from "./components/Pethistory";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AppointmentSummary from "./components/AppointmentSummary";
import Admin from './components/Admin';
import "./App.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
  };

  setAuthStatus = (authenticated) => {
    this.setState({ isAuthenticated: authenticated });
  };
  setUser = (user) => {
    this.setState({ user: user });
  };

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    } catch (error) {
      if (error !== "No current user") {
        console.log(error);
      }
    }
    this.setState({ isAuthenticating: false });
  }
  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser,
    };

    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="page-container">
            <div className="content-wrap">
            {/* <StoreProvider> */}
            <Header auth={authProps}/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/login"
                render={(props) => <LogIn {...props} auth={authProps} />}
              />
               <Route
                exact
                path="/logout"
                render={(props) => <LogOut {...props} auth={authProps} />}
              />
              <Route
                exact
                path="/forgotpassword"
                render={(props) => (
                  <ForgotPassword {...props} auth={authProps} />
                )}
              />
              <Route
                exact
                path="/forgotpasswordverification"
                render={(props) => (
                  <ForgotPasswordVerification {...props} auth={authProps} />
                )}
              />
              <Route
                exact
                path="/changepassword"
                render={(props) => (
                  <ChangePassword {...props} auth={authProps} />
                )}
              />
              <Route
                exact
                path="/changepasswordconfirmation"
                render={(props) => (
                  <ChangePasswordConfirm {...props} auth={authProps} />
                )}
              />
              <Route
                exact
                path="/welcome"
                render={(props) => <Welcome {...props} auth={authProps} />}
              />
              <Route
                exact
                path="/pet/registration"
                render={(props) => (
                  <PetRegistration {...props} auth={authProps} />
                )}
              />
              <Route
                exact
                path="/register"
                render={(props) => <UserRegister {...props} auth={authProps} />}
              />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/appointment" component={Dashboard} />
              <Route exact path="/appointment/:petID" component={Appointment} />
              <Route exact path="/pethistory" component={Pethistory} />
              <Route exact path="/pethistory/:petID" component={Pethistory} />
              <Route
                exact path="/appointment-summary/:appointmentID"
                component={AppointmentSummary}
              />
              <Route exact path="/success/:appointmentID" component={Success} />
              {/* This route is to test the Admin page */}
              <Route exact path="/admin" component={Admin} />
              <Route component={Home} />
            </Switch>
            </div>
            <div className="footer">
              <Footer/>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}
export default App;
