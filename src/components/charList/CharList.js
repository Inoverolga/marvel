import { useEffect, useState, useRef } from "react";
import useMarvelService from "../services/MarvelServic";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";
import PropTypes from "prop-types";

const CharList = (props) => {
    const [char, setChar] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        upDateChars(); //начальное состояние 9 персонажей
    }, []);

    const upDateChars = () => {
        getAllCharacters(offset).then((res) => setChar(res), setOffset(9));
    };

    const onRequest = (offset, initial) => {
        //дозагрузка
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset).then((newChar) => {
            let ended = false;

            if (newChar.length < 9 || newChar.length === 0) {
                ended = true;
            }
            setChar((char) => [...char, ...newChar]);
            setOffset((offset) => offset + 9);
            setCharEnded(ended);
        });
    };

    console.log("charlist");

    const itemRefs = useRef([]); // этот хук используется только на верхнем уровне компонента

    const onFocusItem = (i) => {
        if (itemRefs.current[i]) {
            itemRefs.current[i].focus(); // Фокусируем только нужный элемент
        }
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    const charitem = char.map((item, i) => {
        const { thumbnail, name, id } = item;

        return (
            <li
                ref={(el) => (itemRefs.current[i] = el)}
                tabIndex={0}
                key={id}
                className="charList__flex-item"
                onClick={() => {
                    props.onCharSelected(item.id);
                    onFocusItem(i);
                }}
                onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                        props.onCharSelected(item.id);
                        onFocusItem(i);
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
