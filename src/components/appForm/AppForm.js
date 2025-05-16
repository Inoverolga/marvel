import { Link } from "react-router-dom";
import "./appForm.scss";

const AppForm = ({ style }) => {
    return (
        <form className="appform" style={style}>
            <label className="appform__name" htmlFor="search">
                Or find a character by name:
            </label>
            <div className="appform-wrapper">
                <input
                    id="search"
                    className="appform__input"
                    name="search"
                    type="text"
                    placeholder="Enter name"
                />
                <div className="randomChar__content-buttonBlock">
                    <Link to="/" className="button button__main">
                        <div className="inner">FIND</div>
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default AppForm;
