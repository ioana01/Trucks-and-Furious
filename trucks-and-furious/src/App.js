import React from "react";
import { AuthProvider } from "./contexts/contexts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/auth/register/register";
import Login from "./components/auth/login/login";
import Navbar from "./components/navbar/navbar";
import DemandAndSupplyAddForm from "./components/forms/DemandAndSupplyAddForm/DemandAndSupplyAddForm";
import PrivateRoute from "./components/private-route/private-route";
import MapView from "./components/map/map";
import DemandAndSupplyList from "./components/demand-and-supply-list/demand-and-supply-list";
import RequestDetails from "./components/request-details/request-details";
import Contract from "./components/contract/contract";
import ContractsDisplay from "./components/contracts-display/contracts-display";

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
              <PrivateRoute exact path="/demand-supply-add-form" component={DemandAndSupplyAddForm} />
              <PrivateRoute exact path="/" component={DemandAndSupplyList} />
              <PrivateRoute exact path="/item/:id" component={RequestDetails}/>
              <PrivateRoute exact path="/map" component={MapView}/>
              <PrivateRoute exact path="/contract/:clientRequest/:myRequestId" component={Contract}/>
              <PrivateRoute exact path="/contracts" component={ContractsDisplay}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </div>
  )
}

export default App;