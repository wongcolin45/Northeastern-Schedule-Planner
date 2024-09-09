import { Link, useLocation } from "react-router-dom";
import React, {useState} from 'react';
import Header from "./Header";

function NavBar() {

    const pages = [{name: 'Profile', path: '/home'},
                   {name: 'Requirements', path: '/requirementshub'},
                   {name: 'Schedule', path: '/schedulemaker'},
                   {name: 'Settings', path: '/login'}
    ]

    return (
        <>
            <Header/>
            <div className="navigation-bar">

                {
                    pages.map((page, index) => {
                        const loc = useLocation().pathname;
                        
                        const className = (loc === page.path) ? "button-link-active":"button-link"
                       
                        return (
                                <Link to={page.path} className={className}key={page+index}>
                                    <button>
                                        {page.name} 
                                    </button>
                                 </Link>
                        )      
                        
                    })
                }
               
            </div>
            <hr className="nav-line"></hr>
        </>
    );
}

export default NavBar;