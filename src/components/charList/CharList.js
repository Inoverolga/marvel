import React, { Component } from "react";
import MarvelService from "../services/MarvelServic";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";
import PropTypes from "prop-types";

class CharList extends Component {
    state = {
        char: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 0, //относится к загрузке новых элементов
        charEnded: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.upDateChars(); //начальное состояние 9 картинок
    }

    upDateChars = () => {
        this.marvelService
            .getAllCharacters()
            .then((res) => {
                this.setState({ char: res, loading: false, offset: 9 });
            })
            .catch(() => {
                this.setState({ loading: false, error: true });
            });
    };

    onRequest = (offset) => {
        this.onCharListLoading(); //вызываем загрузку

        this.marvelService
            .getAllCharacters(offset)
            .then((newChar) => {
                let ended = false;

                if (newChar.length < 9 || newChar.length === 0) {
                    ended = true;
                }
                this.setState(() => ({
                    char: [...this.state.char, ...newChar],
                    loading: false,
                    newItemLoading: false,
                    offset: offset + 9,
                    charEnded: ended,
                }));
            })
            .catch(() => {
                this.setState({ loading: false, error: true });
            });
    };

    onCharListLoading = () => {
        this.setState({ newItemLoading: true });
    };

    itemRefs = []; //тут хранится ref

    setRef = (ref, i) => {
        this.itemRefs[i] = ref; // сохраняем ref по индексу
    };

    onFocusItem = (i) => {
        if (this.itemRefs[i]) {
            this.itemRefs[i].focus(); // Фокусируем только нужный элемент
        }
    };

    render() {
        const { char, loading, error, newItemLoading, offset, charEnded } =
            this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const charitem = char.map((item, i) => {
            const { thumbnail, name, id } = item;

            return (
                <li
                    ref={(li) => this.setRef(li, i)}
                    tabIndex={0}
                    key={id}
                    className="charList__flex-item"
                    onClick={() => {
                        this.props.onCharSelected(item.id);
                        this.onFocusItem(i);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            this.props.onCharSelected(item.id);
                            this.onFocusItem(i);
                        }
                    }}
                >
                    <img
                        src={thumbnail}
                        alt={name}
                        className="charList__flex-img"
                    />
                    <div className="charList__flex-name">{name}</div>
                </li>
            );
        });

        return (
            <section className="charList">
                <ul className="charList__flex spinner error">
                    {spinner}
                    {errorMessage}
                    {charitem}
                </ul>
                <div className="randomChar__content-buttonBlock">
                    <button
                        className="button button__long button__main"
                        disabled={newItemLoading || loading} //кнопка блокировалась во время загрузки
                        style={{ display: charEnded ? "none" : "block" }}
                        onClick={() => this.onRequest(offset)}
                    >
                        <div className="inner">LOAD MORE</div>
                    </button>
                </div>
            </section>
        );
    }
}

export default CharList;

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

// при загрузке по средством scroll

// class CharList extends Component {
//     state = {
//         char: [],
//         loading: true,
//         error: false,
//         newItemLoading: false,
//         offset: 0, //относится к загрузке новых элементов
//         charEnded: false,
//     };

//     marvelService = new MarvelService();

//     componentDidMount() {
//         this.upDateChars(); //первоначальная загрузка
//         window.addEventListener("scroll", this.onScroll);
//     }

//     componentWillUnmount() {
//         window.removeEventListener("scroll", this.onScroll);
//     }

//     upDateChars = () => {
//         this.marvelService
//             .getAllCharacters()
//             .then((res) => {
//                 this.setState({ char: res, loading: false, offset: 9 });
//             })
//             .catch(() => {
//                 this.setState({ loading: false, error: true });
//             });
//     };

//     onScroll = () => {
//         const { newItemLoading, charEnded, offset } = this.state;
//         if (
//             window.scrollY + document.documentElement.clientHeight >=
//                 document.documentElement.scrollHeight - 100 &&
//             !newItemLoading &&
//             !charEnded
//         ) {
//             this.onRequest(offset);
//         }
//     };

//     onRequest = (offset) => {
//         this.onCharListLoading(); //вызываем загрузку
//         debugger;
//         this.marvelService
//             .getAllCharacters(offset)
//             .then((newChar) => {
//                 if (newChar.length === 0) {
//                     this.setState({
//                         charEnded: true,
//                         newItemLoading: false,
//                     });
//                     return;
//                 }

//                 let ended = false;

//                 if (newChar.length < 9 || newChar.length === 0) {
//                     ended = true;
//                 }
//                 this.setState(() => ({
//                     char: [...this.state.char, ...newChar],
//                     loading: false,
//                     newItemLoading: false,
//                     offset: offset + 9,
//                     charEnded: ended,
//                 }));
//             })
//             .catch(() => {
//                 this.setState({ loading: false, error: true });
//             });
//     };

//     onCharListLoading = () => {
//         this.setState({ newItemLoading: true });
//     };

//     render() {
//         const { char, loading, error } = this.state;

//         const errorMessage = error ? <ErrorMessage /> : null;
//         const spinner = loading ? <Spinner /> : null;
//         const charitem = char.map((item) => {
//             const { thumbnail, name, id } = item;

//             return (
//                 <li
//                     key={id}
//                     className="charList__flex-item"
//                     onClick={() => this.props.onCharSelected(item.id)}
//                 >
//                     <img
//                         src={thumbnail}
//                         alt={name}
//                         className="charList__flex-img"
//                     />
//                     <div className="charList__flex-name">{name}</div>
//                 </li>
//             );
//         });

//         return (
//             <section className="charList">
//                 <ul className="charList__flex spinner error">
//                     {spinner}
//                     {errorMessage}
//                     {charitem}
//                 </ul>
//             </section>
//         );
//     }
// }
