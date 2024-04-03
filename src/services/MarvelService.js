class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=59ade73a6bab58b7eaee407a2a69c7fc';
    _baseOffset = '210';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Couldn not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description.length > 196 ? char.description.slice(0, 193) + '...' : char.description : 'This hero is still anonymous!)',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }

}



export default MarvelService;