import { Link } from "react-router-dom";
import xmen from "../resourses/img/x-men.png";
import uw from "../resourses/img/UW.png";
import "./appComics.scss";

const AppComics = () => {
    const dataComics = [
        {
            img: uw,
            name: "ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB",
            price: "9.99$",
        },
        {
            img: xmen,
            name: "X-Men: Days of Future Past",
            price: "NOT AVAILABLE",
        },
        {
            img: uw,
            name: "ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB",
            price: "9.99$",
        },
        {
            img: xmen,
            name: "X-Men: Days of Future Past",
            price: "9.99$",
        },
        {
            img: uw,
            name: "ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB",
            price: "9.99$",
        },
        {
            img: xmen,
            name: "X-Men: Days of Future Past",
            price: "NOT AVAILABLE",
        },
        {
            img: uw,
            name: "ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB",
            price: "9.99$",
        },
        {
            img: xmen,
            name: "X-Men: Days of Future Past",
            price: "9.99$",
        },
    ];

    const comics = dataComics.map((item) => {
        return (
            <Link to="/comicsitem" className="appcomics__flex-item">
                <img
                    src={item.img}
                    alt="comics"
                    className="appcomics__flex-img"
                />
                <div className="appcomics__flex-name">{item.name}</div>
                <div className="appcomics__flex-price">{item.price}</div>
            </Link>
        );
    });

    return (
        <section className="appcomics">
            <div className="appcomics__list-flex">{comics}</div>
            <div className="randomChar__content-buttonBlock">
                <Link
                    to="/loadmore"
                    className="button button__long button__main"
                >
                    <div className="inner">LOAD MORE</div>
                </Link>
            </div>
        </section>
    );
};

export default AppComics;
