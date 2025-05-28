import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import useMarvelService from "../services/MarvelServic";
import "./appComics.scss";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const AppComics = (props) => {
    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    const initialLoadRef = useRef(false); // ← блокируем повторные запросы

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        const controller = new AbortController();

        if (!initialLoadRef.current) {
            initialLoadRef.current = true; // ← запрос выполнится только один раз
            onRequest(offset, true, controller.signal);
        }

        return () => controller.abort();
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset).then(onComicsListLoaded);
    };

    const onComicsListLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }
        setComics((comics) => [...comics, ...newComics]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 8);
        setCharEnded(ended);
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    const comicsItem = comics.map((item) => {
        const { id, title, thumbnail, price } = item;
        return (
            <Link className="appcomics__flex-item">
                <img
                    key={id}
                    src={thumbnail}
                    alt="comics"
                    className="appcomics__flex-img"
                />
                <div className="appcomics__flex-name">{title}</div>
                <div className="appcomics__flex-price">{price} $</div>
            </Link>
        );
    });

    return (
        <section className="appcomics">
            <div className="appcomics__list-flex">
                {errorMessage}
                {spinner}
                {comicsItem}
            </div>
            <div className="randomChar__content-buttonBlock">
                <button
                    className="button button__long button__main"
                    disabled={loading} //кнопка блокировалась во время загрузки
                    style={{ display: charEnded ? "none" : "block" }}
                    onClick={() => onRequest(offset)}
                >
                    <div className="inner">LOAD MORE</div>
                </button>
            </div>
        </section>
    );
};

export default AppComics;
