import React from "react";
import { AuthProvider } from "./contexts/contexts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/auth/register/register";
import Login from "./components/auth/login/login";
import Navbar from "./components/navbar/navbar";
import DemandAndSupplyAddForm from "./components/forms/DemandAndSupplyAddForm/DemandAndSupplyAddForm";
import PrivateRoute from "./components/private-route/private-route";
import DemandAndSupplyList from "./components/demand-and-supply-list/demand-and-supply-list";
import RequestDetails from "./components/request-details/request-details";
import Contract from "./components/contract/contract";
import ContractsDisplay from "./components/contracts-display/contracts-display";
import AdminPage from "./components/admin/admin-page/admin-page";
import AddTruckForm from "./components/forms/AddTruckForm/AddTruckForm";
import ArgcisMap from "./components/map/argcis-map";
import esriConfig from "@arcgis/core/config";
import TrucksMap from "./components/map/map";

import { useEffect } from "react";


function App() {
  
  useEffect(() => {
    esriConfig.apiKey = "AAPK0673926dc6f84480bd2d4ff14c5d9181HRAtsleTjkHDX3ogX6WYQQSvoMFvy9HK27BY6x9364PtO-jopfohGm27L6CxCYBW";
  }, [])
  
  return (
    <div className="align-items-center justify-content-center">
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Navbar/>
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/admin" component={AdminPage} />
              <PrivateRoute exact path="/demand-supply-add-form" component={DemandAndSupplyAddForm} />
              <PrivateRoute exact path="/add-trucks" component={AddTruckForm} />
              <PrivateRoute exact path="/item/:id" component={RequestDetails}/>
              <PrivateRoute exact path="/map/:contractNonce" component={ArgcisMap}/>
              <PrivateRoute exact path="/contract/:clientRequest/:myRequestId" component={Contract}/>
              <PrivateRoute exact path="/contracts" component={ContractsDisplay}/>
              <PrivateRoute exact path="/" component={DemandAndSupplyList} />
            </Switch>
          </AuthProvider> 
        </Router>
      </div>
    </div>
  )
}

export default App;