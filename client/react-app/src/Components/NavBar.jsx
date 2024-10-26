import { Link } from "react-router-dom";


function NavBar() {

    const pages = [{name: 'Home', path: '/'},
                   {name: 'Schedule', path: '/schedule'},
                   {name: 'Transfer Credit', path: '/transfer-credit'},
                   {name: 'Settings', path: '/settings'},
                   {name: 'Login', path: '/login'}
    ]

    return (
        <div className="navigation-bar">
            {
                pages.map((page, index) => {

                    return (
                            <Link to={page.path} key={page+index}>
                                <button>
                                    {page.name}
                                </button>
                             </Link>
                    )
                })
            }

        </div>
    );
}

export default NavBar;