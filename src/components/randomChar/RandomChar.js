import { Component } from "react";
import { Link } from "react-router-dom";
import MarvelService from "../services/MarvelServic";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./randomChar.scss";

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false, //новое состояние (ошибка)
    };

    marvelServic = new MarvelService();

    componentDidMount() {
        this.upDateChar();
        //   this.timerId = setInterval(this.upDateChar, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }
    onChartLoaded = (char) => {
        //наш персонаж загрузился, убираем дублирование перезаписи в state(this.setState(res))
        this.setState({ char, loading: false }); //аналог char: char;
    };

    onError = () => {
        this.setState({
            loading: false, // false т.к. если произошла ошибка, то нет загрузки
            error: true,
        });
    };

    upDateChar = () => {
        const id = Math.floor(Math.random() * (20 - 1) + 1); //конструкция для отображения рандомных чисел
        this.setState({ loading: true });
        this.marvelServic
            .getCharacter(id)
            .then(this.onChartLoaded)
            .catch(this.onError); //если произошла ошибка

        //   this.marvelServic.getAllCharacters().then((res) => console.log(res)); //запрос всех персонажей
    };

    render() {
        const { char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;

        //   логика: если идет загрузка, то спинер, если не идет загрузка,
        //   то ошибка, если персанаж загрузился, то его отображение
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
                        <div
                            className="inner"
                            onClick={loading ? <Spinner /> : this.upDateChar}
                        >
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
    }
}

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
