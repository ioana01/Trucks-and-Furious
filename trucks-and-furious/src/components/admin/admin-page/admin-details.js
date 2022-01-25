import React from "react";

export default function AdminDetails({ item, sidebarChoice, handleDelete }) {

    return (
        <div className="row mt-4 p-3">
            <div className="card col-12 col-xl-10 mb-4 mb-lg-0">
                <div class="row p-2">                                           
                    <div class="col-xs-12"> Text here </div>          
                </div>                                                      
                <div class="row p-2">                                           
                    <div class="col-xs-12"> 
                        <button type="button" class="btn btn-danger">Delete</button>
                    </div>               
                </div>                                                      
            </div>
        </div>
    );
}