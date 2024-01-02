import React from "react";
import { Link } from "react-router-dom"

function BreadCrumbBar ({level1='', level2=''}) {

    
    if (level1=='' && level2=='') {
        return (
            <div>
             <ul className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            </ul>
        </div>
        );
    } 
    if (level1!='' && level2=='') { //if only level 1 is defined
        return (
            <div>
             <ul className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li><Link to="#">{`${level1}`}</Link></li>

            </ul>
        </div>
        );
    } 
    if (level1!='' && level2!='') { //if both levels are defined
        return (
            <div>
                 <ul className="breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li><Link to="#">{`${level1}`}</Link></li>
                    <li><Link to="#">{`${level2}`}</Link></li>
                </ul>
            </div>
        ) ;
    } else {
        return (
            <div>
             <ul className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            </ul>
        </div>
        );
    }
    
}

export default BreadCrumbBar;