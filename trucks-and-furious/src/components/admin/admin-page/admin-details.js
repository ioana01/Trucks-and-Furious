import React from "react";
import { useState } from "react";
import { database } from "../../../firebase";

export default function AdminDetails({ sidebarChoice }) {

    const [newItem, setNewItem] = useState(null);
 
    const handleSubmit = () => {
        if (sidebarChoice === "Merch") {
            database.ref("merch").push({name: newItem});
            setNewItem("");
        }
    }

    const handleChange = (event) => {
        setNewItem(event.target.value)
    }

    return (
        <div className="row mt-4 p-3">
            <div className="card col-12 col-xl-10 mb-4 mb-lg-0">
                <div className="form-group mt-2">
                    <label htmlFor="arrival-input">Adauga o intrare: </label>
                    <input type="text" className="form-control" id="merch-input" 
                        onChange={handleChange}
                        value={newItem}
                        placeholder="New merchandise..."/>
                </div>                                                     
                <div className="row p-2">                                           
                    <div className="col-xs-12"> 
                        <button onClick={handleSubmit} type="button" className="btn btn-success">Adauga</button>
                    </div>               
                </div>                                                      
            </div>
        </div>
    );
}