import { Component } from "react";
import { Link } from "react-router-dom";
import MarvelService from "../services/MarvelServic";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import "./charInfo.scss";

class CharInfo extends Component {
    state = {
        char: null,
        loading: false, // т.к. загрузка должны появляться только после действий пользователей
        error: false, //новое состояние (ошибка)
    };

    marvelServic = new MarvelService();

    componentDidMount() {
        this.upDateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        //когда меняется state
        //prevProps и prevState - это предыдущее состояние
        if (this.props.charId !== prevProps.charId) {
            //очень важно Условие
            this.upDateChar();
        }
    }
    upDateChar = () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading(); //для того чтобы спинер также появился перед тем как будет отправлен запрос

        this.marvelServic
            .getCharacter(charId)
            .then(this.onChartLoaded)
            .catch(this.onError);

        //this.foo.bar = 0; спецюошибка
    };

    onChartLoaded = (char) => {
        //наш персонаж загрузился, убираем дублирование перезаписи в state(this.setState(res))
        this.setState({ char, loading: false }); //аналог char: char;
    };

    onCharLoading = () => {
        this.setState({
            loading: true,
        });
    };

    onError = () => {
        this.setState({
            loading: false, // false т.к. если произошла ошибка, то нет загрузки
            error: true,
        });
    };

    render() {
        const { char, loading, error } = this.state;
        //условный рендеринг
        const skeleton = char || loading || error ? null : <Skeleton />; //начальное состояние
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? (
            <View char={char} />
        ) : null;

        return (
            <section className="charInfo">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </section>
        );
    }
}

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
