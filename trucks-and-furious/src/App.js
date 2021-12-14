import React from "react";
import { AuthProvider } from "./contexts/AuthContexts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/Auth/SignUp/SignUp";
import Login from "./components/Auth/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  

  return (
    <>
      <div
        className="align-items-center justify-content-center"
      >
        <div className="w-100">
          <Router>
            <AuthProvider>
              <Navbar/>
              <Switch>
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </div>
    </>
  )
}

export default App;