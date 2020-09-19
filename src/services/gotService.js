export default class GotService {
    
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json(); //ОБЪЕКТ!
    }    

    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=20&pageSize=10');
        return res.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllBooks = async () => {
        const res = await this.getResource('/books');
        return res.map(this._transformCharacter);        
    }

    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }

    getAllHouses = async () => {
        const res = await this.getResource('/houses?page=4&pageSize=10');
        return res.map(this._transformCharacter);
    }

    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    _transformCharacter(char) {
        return {
            name: (char.name!=='') ? char.name : 'N/D',
            gender: (char.gender!=='') ? char.gender : 'N/D',
            born: (char.born!=='') ? char.born : 'N/D',
            died: (char.died!=='') ? char.died : 'N/D',
            culture: (char.culture!=='') ? char.culture : 'N/D',
            id: char.url.match(/\d/g).join('')   
        }
    }

    _transformHouse(house) {
        return {
            name: (house.name!=='') ? house.name : 'N/D',
            region: (house.region!=='') ? house.region : 'N/D',
            words: (house.words!=='') ? house.words : 'N/D',
            titles: (house.titles!=='') ? house.titles : 'N/D',
            overlord: (house.overlord!=='') ? house.overlord : 'N/D',
            ancestralWeapons: (house.ancestralWeapons!=='') ? house.ancestralWeapons : 'N/D',
            id: house.url.match(/\d/g).join('') 
        }
    }

    _transformBook(book) {
        return {
            name: (book.name!=='') ? book.name : 'N/D',
            numberOfPages: (book.numberOfPages!=='') ? book.numberOfPages : 'N/D',
            publisher: (book.publisher!=='') ? book.publisher : 'N/D',
            released: (book.released!=='') ? book.released.substring(0,book.released.indexOf("T")) : 'N/D',
            id: book.url.match(/\d/g).join('') 
        }
    }
}
