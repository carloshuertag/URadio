class Song {
    constructor(isrc, title, album, artist, spotifyId) {
        this.#isrc = isrc;
        this.#title = title;
        this.#album = album;
        this.#artist = artist;
        this.#spotifyId = spotifyId;
    }
    get isrc() { return this.#isrc; }
    set isrc(isrc) { this.#isrc = isrc; }
    get title() { return this.#title; }
    set title(title) { this.#title = title; }
    get album() { return this.#album; }
    set album(album) { this.#album = album; }
    get artist() { return this.#artist; }
    set artist(artist) { this.#artist = artist; }
    get spotifyId() { return this.#spotifyId; }
    set spotifyId(spotifyId) { this.#spotifyId = spotifyId; }
    toJSON() {
        return {
            isrc: this.#isrc,
            title: this.#title,
            album: this.#album,
            artist: this.#artist,
            spotifyId: this.#spotifyId,
        };
    }
    toJSONString() { return JSON.stringify(this.toJSON()); }
}