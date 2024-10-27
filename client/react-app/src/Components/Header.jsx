import NavBar from "./NavBar.jsx";

function Header() {
    /**
     *  <img src="src/images/huskyHead.png" width={150} height={150}></img>
     */
    return (
        <div className="header-container">
            <div className="header-contents">
                <h1>Khoury Planner </h1>
                <h1 id={'beta'}>Beta</h1>
            </div>

            <NavBar/>
        </div>

    )
}

export default Header;