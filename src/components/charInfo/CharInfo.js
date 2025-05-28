import { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // ES6

import useMarvelService from "../services/MarvelServic";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import "./charInfo.scss";

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const { error, loading, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        upDateChar();
    }, [props.charId]);

    const upDateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }
        clearError(); //перед тем как делаем новый запрос убираем ошибку
        getCharacter(charId).then(onChartLoaded);
    };

    const onChartLoaded = (char) => {
        setChar(char);
    };

    //условный рендеринг
    const skeleton = char || loading || error ? null : <Skeleton />; //начальное состояние
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <section className="charInfo">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </section>
    );
};

//конструкция проверки типа данных
CharInfo.propTypes = {
    charId: PropTypes.number,
};

const View = ({ char }) => {
    const { name, thumbnail, description, homepage, wiki, comics } = char;
    //     let imgStyle = { objectFit: "cover" };
    //     if (thumbnail === ".....") {
    //         imgStyle = { objectFit: "contain" };
    //     }
    //     использование: <img
    //         style={imgStyle}
    //         src={thumbnail}
    //         alt={name}
    //         className="randomChar__info-block-img"
    //     />;

    return (
        <>
            <div className="randomChar__info-block">
                <img
                    src={thumbnail}
                    alt={name}
                    className="randomChar__info-block-img"
                />
                <div className="randomChar__content">
                    <div className="randomChar__content-characters">{name}</div>

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
            <p className="charInfo__content-description">{description}</p>
            <h3 className="charInfo__content-title">Comics:</h3>
            <ul className="charInfo__content-comicsList">
                {comics.length > 0 ? null : "There is no comics"}
                {comics.map((item, i) => {
                    if (i > 0) return; //используем только если мало элементов
                    //   если много, то через обычный цикл используя break
                    //   и обязательно формировать новый [], а не мутировать предыдущий

                    return (
                        <li
                            key={i}
                            className="charInfo__content-comicsList-item"
                        >
                            {item}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default CharInfo;
