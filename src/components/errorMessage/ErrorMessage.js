import picture from "../errorMessage/Z16w.gif";

const ErrorMessage = () => {
    //     return <img src={process.env.PUBLIC_URL + "/Z16w.gif"} />;
    //     кoнструкция применяется если нам нужен статичный файл из папаки public

    return <img className="error" src={picture} alt="error" />;
};
export default ErrorMessage;
