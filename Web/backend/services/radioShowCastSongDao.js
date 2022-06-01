const db = require('./db');
const helper = require('../helper');
const config = require('../config');
async function createInvalidRadioShowCastSong(radioShowCastSong) {
    const result = await db.query(
        `insert into radioShowCastSong (isrc, managerId, date, valid) values (?, ?, ?, ?)`, [radioShowCastSong.isrc, radioShowCastSong.managerId, radioShowCastSong.date, 0]
    );
    let message = (result.affectedRows) ?
        'Radio show cast song created successfully' :
        'Error in creating radio show cast song';
    return { message };
}
async function createValidRadioShowCastSong(radioShowCastSong) {
    const result = await db.query(
        `insert into radioShowCastSong (isrc, managerId, castDate, valid) values (?, ?, ?, ?)`, [radioShowCastSong.isrc, radioShowCastSong.managerId, radioShowCastSong.date, 1]
    );
    let message = (result.affectedRows) ?
        'Radio show cast song created successfully' :
        'Error in creating radio show cast song';
    return { message };
}
async function readRadioShowCastSong(page = 1, radioShowCastSong) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `select * from radioShowCastSong where managerId = ? and castDate = ? limit ${offset},${config.listPerPage}`, [radioShowCastSong.managerId, radioShowCastSong.castDate]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return {
        data,
        meta
    }
}
async function readValidRadioShowCastSong(page = 1, castDate) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `select * from radioShowCastSong where castDate = ? and valid = ? limit ${offset},${config.listPerPage}`, [castDate, 1]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return {
        data,
        meta
    }
}
async function updateRadioShowCastSong(isrc, managerId) {
    const result = await db.query(
        `update radioShowCastSong set valid = 1 where isrc = ? and managerId = ?`, [isrc, managerId]
    );
    let message = (result.affectedRows) ?
        'Radio show cast song updated successfully' :
        'Error in updating radio show cast song';
    return { message };
}