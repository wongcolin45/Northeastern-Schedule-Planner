
import PropTypes from "prop-types";
import {MyContext} from "../App.jsx";
import {useContext} from "react";

function NUPathButton(props) {

    const {schedule} = useContext(MyContext);

    const title = `${schedule.getNUPathCount()}/11 Completed`;

    const handleClick = () => {
        props.setPathClicked(true);
    }

    return (
        <button id='nupath-button'
                style={props.style}
                onClick={handleClick}>{title}</button>
    )
}

export default NUPathButton;

NUPathButton.propTypes = {
    setPathClicked: PropTypes.func.isRequired,
    style: PropTypes.object,
}