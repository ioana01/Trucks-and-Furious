import React from "react";

import { UsersIcon
        ,ShoppingCartIcon
        ,BriefcaseIcon
        ,TruckIcon
        ,PhoneIncomingIcon
        ,PhoneOutgoingIcon } from '@heroicons/react/outline';

import './admin-page.css';

export default function AdminSidebar(props) {

  const isCurrentSidebarChoice = (choice) => {
    return props.sidebarChoice === choice ? "active" : "";
 }

  return (
    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div className="position-sticky pt-md-5">
            <ul className="nav flex-column">
                <li className="nav-item d-flex align-items-center sidebar_item mt-2">
                    <ShoppingCartIcon className="sidebar_icon"/>
                    <span className="ml-2">Stocks</span>
                </li>
                <li className="nav-item d-flex align-items-center sidebar_item mt-2">
                    <BriefcaseIcon className="sidebar_icon"/>
                    <span className="ml-2">Contracts</span>
                </li>
                <li className="nav-item d-flex align-items-center sidebar_item mt-2">
                    <TruckIcon className="sidebar_icon"/>
                    <span className="ml-2">Trucks</span>
                </li>
                <li className="nav-item d-flex align-items-center sidebar_item mt-2">
                    <UsersIcon className="sidebar_icon"/>
                    <span className="ml-2">Users</span>
                </li>
                <li className="nav-item d-flex align-items-center sidebar_item mt-2">
                    <PhoneIncomingIcon className="sidebar_icon"/>
                    <span className="ml-2">Tr. Requests</span>
                </li>
                <li className="nav-item d-flex align-items-center sidebar_item mt-2">
                    <PhoneOutgoingIcon className="sidebar_icon"/>
                    <span className="ml-2">Tr. Offers</span>
                </li>
            </ul>
        </div>
    </nav>
  );
}