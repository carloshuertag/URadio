const db = require('./db');
const helper = require('../helper');
const config = require('../config');
async function createSong(song) {
    const result = await db.query(
        `insert into song (isrc, title, album, artist, spotifyId) values (?, ?, ?, ?, ?)`, [song.isrc, song.title, song.album, song.artist, song.spotifyId]
    );
    let message = (result.affectedRows) ?
        'Song created successfully' :
        'Error in creating song';
    return { message };
}
async function readSong(page = 1, isrc) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `select * from song where isrc = ? limit ${offset},${config.listPerPage}`, [isrc]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return {
        data,
        meta
    }
}
module.exports = {
    createSong,
    readSong
}