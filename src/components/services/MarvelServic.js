import { useHttp } from "../../hooks/http.hook";

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();
    const _apiBase = "https://marvel-server-zeta.vercel.app/";
    const _apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df";
    const _baseOffset = "0"; //т.е. сколько персонажей мы пропустим

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`,
        );
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const _transformCharacter = (ichar) => {
        return {
            id: ichar.id,
            name: ichar.name,
            description: ichar.description,
            thumbnail: ichar.thumbnail.path + "." + ichar.thumbnail.extension, //картинка
            homepage: ichar.urls[0].url, //кнопка1
            wiki: ichar.urls[1].url, //кнопка2
            comics: ichar.comics.items,
        };
    };

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`,
        );
        return res.data.results.map(_transformCharacterOFComics);
    };

    const _transformCharacterOFComics = (item) => {
        return {
            id: item.id,
            title: item.title,
            thumbnail: item.thumbnail.path + "." + item.thumbnail.extension, //картинка
            price:
                item.prices && item.prices[0]
                    ? item.prices[0].price
                    : "Not available",
        };
    };

    return {
        loading,
        error,
        clearError,
        getAllCharacters,
        getCharacter,
        getAllComics,
    };
};

export default useMarvelService;
