import {MyContext} from "../App.jsx";
import {useContext} from "react";
import propTypes from "prop-types";
import PropTypes from "prop-types";

function NUPathView(props) {
    const {schedule} = useContext(MyContext);
    const style = props.style;

    return (
        <div style={style} className='nupath-selection-container'>
            <h1 style = {style} >NU Path Requirements</h1>
            <div style={style} className='nupath-contents-container'>
                {
                    Object.entries(schedule.getPath()).map(([key, value]) => {
                        const check = (value.size >= 1) ? " ✔" : '';
                        return (
                            <div key={key+value} className='attribute-container'>
                                <h3>{key + check}</h3>
                                <ul key={key+check+value}>
                                    {
                                        [...value].map(((course, index) => {
                                            return <li key={course+index}>{course}</li>
                                        }))
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default NUPathView;

NUPathView.propTypes = {
    style: PropTypes.object
}