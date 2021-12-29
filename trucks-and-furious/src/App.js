import React from "react";
import { AuthProvider } from "./contexts/contexts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/auth/register/register";
import Login from "./components/auth/login/login";
import Navbar from "./components/navbar/navbar";
import PrivateRoute from "./components/private-route/private-route";
import MapView from "./components/map/map";
import DemandAndSupplyList from "./components/demand-and-supply-list/demand-and-supply-list";

function App() {
  return (
    <div className="align-items-center justify-content-center">
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Navbar/>
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={DemandAndSupplyList} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </div>
  )
}

export default App;