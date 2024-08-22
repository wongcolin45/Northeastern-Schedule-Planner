import NavBar from "../Components/NavBar";

function Login() {
    return (
        <>
            <NavBar/>
            <div className="profile-container">
                <h1>Academic Profile</h1>
                <h2>Select Major</h2>
                <button>Computer Science</button>
                <h2>Select Concentration</h2>
                <button>Artificial Inteligence</button>
                <button>Human Centered Computing</button>
                <button>Software</button>
                <button>Systems</button>
                <button>Foundations</button> 
            </div>
        </>
    )


}

export default Login;