
import Header from "../Components/Header.jsx";
import '../Styles/Home.css';


function Home() {
    return (
        <>
            <Header/>
            <div className='home-container'>
                <h1>Northeastern University Schedule Planner</h1>
                <h2>Project Overview</h2>
                <p>The Northeastern CS Schedule Planner is a full-stack application
                    designed specifically for Computer Science majors at Northeastern University.
                    It helps you organize your semester by planning out your course schedules, and
                    mapping out the requirements you need to complete to graduate.</p>
                <h3>Technologies Used</h3>
                <ul>
                    <li><b>Frontend:</b> Built with React, the best frontend library</li>
                    <li><b>Backend</b> Developed with Express.js to handle data requests and server-side logic.</li>
                    <li><b>Database</b>: Integrated with SQLite using Sequelize ORM for to store course data and major requirements.</li>
                </ul>
                <h2>Navigation</h2>
                <p>Currently the user login and authentication is not finished, but I have the project currently save your schedules made on the browser for now.</p>
                <h3>Pages</h3>
                <ul>
                    <span><b>Home</b> - the current page your on right now</span>
                    <br></br><br></br>
                    <span><b>Schedule</b> - this is the main hub for mapping out your schedules</span>
                    <br></br><br></br>
                    <span><b>Transfer Credit</b> - currently takes in ap credits (still in progress with some of the
                        transfer courses)
                    </span>
                    <br></br><br></br>
                    <span><b>Settings</b> - more option coming soon, but you can set your concentration here</span>
                    <br></br><br></br>
                    <span><b>Login</b> - not set up at all, will take a while</span>
                </ul>
                <h2>Contribute on Github</h2>
                <span>{'Project is far from finished feel free to contribute '}
                <a href={'https://github.com/wongcolin45/Northeastern-Schedule-Planner'}>here</a></span>
            </div>
        </>


    )
}

export default Home;