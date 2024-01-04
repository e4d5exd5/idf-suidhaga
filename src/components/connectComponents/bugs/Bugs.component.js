import React, { useState } from "react";
import { Formik } from "formik";
import BugForm from "./bugForm.component";

const Bugs = () => {

    const[ bugFormModel , setBugFormModel ] = useState(false);

    return(
        <>
            <div>
                <div className="hover:font-medium cursor-pointer" onClick={()=>{setBugFormModel(!bugFormModel)}}>
                    Report Bug
                    
                </div>
                {bugFormModel && <BugForm/> }
            </div>
        </>
    )
}
export default Bugs;