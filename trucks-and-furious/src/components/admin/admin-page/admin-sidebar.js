import React from "react";

import { UsersIcon
        ,ShoppingCartIcon
        ,BriefcaseIcon
        ,TruckIcon
        ,PhoneIncomingIcon
        ,PhoneOutgoingIcon } from '@heroicons/react/outline';

import './admin-page.css';

export default function AdminSidebar({ handleSidebarChoice, sidebarChoice }) {

  const isCurrentSidebarChoice = (choice) => {
    return sidebarChoice === choice ? "active_sidebar_item" : "";
 }

  return (
    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div className="position-sticky pt-md-5">
            <ul className="nav flex-column">
                <li className={`nav-item d-flex align-items-center sidebar_item mt-2 ${isCurrentSidebarChoice("Users")}`}
                    onClick={() => handleSidebarChoice("Users")}>
                    <UsersIcon className="sidebar_icon"/>
                    <span className="ml-2">Users</span>
                </li>
                <li className={`nav-item d-flex align-items-center sidebar_item mt-2 ${isCurrentSidebarChoice("Merch")}`}
                    onClick={() => handleSidebarChoice("Merch")}>
                    <ShoppingCartIcon className="sidebar_icon"/>
                    <span className="ml-2">Merchandise</span>
                </li>
                <li className={`nav-item d-flex align-items-center sidebar_item mt-2 ${isCurrentSidebarChoice("Contracts")}`}
                    onClick={() => handleSidebarChoice("Contracts")}>
                    <BriefcaseIcon className="sidebar_icon"/>
                    <span className="ml-2">Contracts</span>
                </li>
                <li className={`nav-item d-flex align-items-center sidebar_item mt-2 ${isCurrentSidebarChoice("Trucks")}`}
                    onClick={() => handleSidebarChoice("Trucks")}>
                    <TruckIcon className="sidebar_icon"/>
                    <span className="ml-2">Trucks</span>
                </li>
                <li className={`nav-item d-flex align-items-center sidebar_item mt-2 ${isCurrentSidebarChoice("Requests")}`}
                    onClick={() => handleSidebarChoice("Requests")}>
                    <PhoneIncomingIcon className="sidebar_icon"/>
                    <span className="ml-2">Tr. Requests</span>
                </li>
                <li className={`nav-item d-flex align-items-center sidebar_item mt-2 ${isCurrentSidebarChoice("Offers")}`}
                    onClick={() => handleSidebarChoice("Offers")}>
                    <PhoneOutgoingIcon className="sidebar_icon"/>
                    <span className="ml-2">Tr. Offers</span>
                </li>
            </ul>
        </div>
    </nav>
  );
}