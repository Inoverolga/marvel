import { Link } from "react-router-dom";

import "./appHeader.scss";

const AppHeader = () => {
    return (
        <header>
            <div className="header">
                <h1 className="header__title">
                    Marvel
                    <span className="header__title-span">
                        information portal
                    </span>
                </h1>
                <div className="header__menu">
                    <Link to="/characters">
                        <p className="header__menu-characters">Characters</p>
                    </Link>
                    <span className="header__menu-slash">/</span>
                    <Link to="/comics">
                        <p className="header__menu-comics">Comics</p>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
