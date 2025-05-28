import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useMarvelService from "../services/MarvelServic";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./randomChar.scss";

const RandomChar = () => {
    const [char, setChar] = useState({});

    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        upDateChar();
        //   const timerId = setInterval(upDateChar, 5000);
        //   return () => {
        //       clearInterval(timerId);
        //   };
    }, []);

    const onChartLoaded = (char) => {
        setChar(char);
    };

    const upDateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (20 - 1) + 1); //конструкция для отображения рандомных чисел
        console.log(id);
        getCharacter(id).then(onChartLoaded);
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
        <section className="randomChar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomChar__cta-block">
                <p className="randomChar__cta-block-text">
                    Random character for today! <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomChar__cta-block-text randomChar__cta-block-text-second">
                    Or choose another one
                </p>
                <Link
                    to="/"
                    className="button button__main randomChar__cta-block-button"
                >
                    <div className="inner" onClick={upDateChar}>
                        TRY IT
                    </div>
                </Link>
                <div className="randomChar__cta-block-decoration">
                    <img
                        className="randomChar__cta-block-decoration-shield"
                        src={require("../resourses/img/shield.png")}
                        alt="shield"
                    />
                    <img
                        className="randomChar__cta-block-decoration-mjolnir"
                        src={require("../resourses/img/mjolnir (1).png")}
                        alt="mjolnir"
                    />
                </div>
            </div>
        </section>
    );
};

const View = ({ char }) => {
    const { name, thumbnail, description, homepage, wiki } = char;

    return (
        <div className="randomChar__info-block">
            <img
                src={thumbnail}
                alt={name}
                className="randomChar__info-block-img"
            />
            <div className="randomChar__content ">
                <div className="randomChar__content-characters">{name}</div>
                <p className="randomChar__content-text">{description}</p>
                <div className="randomChar__content-buttonBlock">
                    <Link to={homepage} className="button button__main">
                        <div className="inner">HOMEPAGE</div>
                    </Link>

                    <Link to={wiki} className="button button__secondary">
                        <div className="inner">WIKI</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;
