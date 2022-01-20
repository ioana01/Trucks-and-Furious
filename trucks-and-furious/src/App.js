import React from "react";
import { AuthProvider } from "./contexts/contexts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/auth/register/register";
import Login from "./components/auth/login/login";
import Navbar from "./components/navbar/navbar";
import DemandAndSupplyAddForm from "./components/forms/DemandAndSupplyAddForm/DemandAndSupplyAddForm";
import AddTruckForm from "./components/forms/AddTruckForm/AddTruckForm";
import PrivateRoute from "./components/private-route/private-route";
import MapView from "./components/map/map";
import DemandAndSupplyList from "./components/demand-and-supply-list/demand-and-supply-list";
import RequestDetails from "./components/request-details/request-details";

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
              <PrivateRoute exact path="/add-truck" component={AddTruckForm}/>
              <PrivateRoute exact path="/demand-supply-add-form" component={DemandAndSupplyAddForm} />
              <PrivateRoute exact path="/" component={DemandAndSupplyList} />
              <PrivateRoute exact path="/item/:id" component={RequestDetails}/>
              <PrivateRoute exact path="/map" component={MapView}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </div>
  )
}

export default App;