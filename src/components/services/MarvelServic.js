// создаем обычны класс на нативном js т.к. нам не нужны не пропсы ни стэйты
class MarvelService {
    _apiBase = "https://marvel-server-zeta.vercel.app/";
    _apiKey = "apikey=d4eecb0c66dedbfae4eab45d312fc1df";
    _baseOffset = "0"; //т.е. сколько персонажей мы пропустим

    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };
    getAllCharacters = async (offset = this._baseOffset) => {
        //по умолчанию 0, если мы ничего не передадим
        const res = await this.getResource(
            `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`,
        );
        return res.data.results.map(this._transformCharacter);
    };

    getCharacter = async (id) => {
        //т.к. функция getResiurce асинхронная, то мы должны дождать резуьтата
        const res = await this.getResource(
            `${this._apiBase}characters/${id}?${this._apiKey}`,
        );
        return this._transformCharacter(res.data.results[0]);
    };

    _transformCharacter = (ichar) => {
        //получили данные с сервера и вернули (трансформировали) в том виде в котором нам они нужны
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
}

export default MarvelService;
