const db = require('./db');
const helper = require('../helper');
const config = require('../config');
async function createRadioShow(radioShow) {
    const result = await db.query(
        `insert into radioShow (managerId, name, schedule, host, availableAt) values 
        (?, ?, ?, ?, ?)`, [radioShow.managerId, radioShow.name, radioShow.schedule, radioShow.host, radioShow.availableAt]
    );
    let message = (result.affectedRows) ?
        'Radio show manager created successfully' :
        'Error in creating radio show managers';
    return { message };
}
async function readRadioShows(page) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `select * from radioShow limit ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return {
        data,
        meta
    }
}
async function readRadioShow(page = 1, managerId) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `select * from radioShow where managerId = ? limit ${offset},${config.listPerPage}`, [managerId]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return {
        data,
        meta
    }
}
async function updateRadioShow(id, radioShow) {
    const result = await db.query(
        `update radioShow set name = ?, schedule = ?', host = ?', availableAt = ? where managerId = ?'`, [radioShow.name, radioShow.schedule, radioShow.host, radioShow.availableAt, id]
    );
    let message = (result.affectedRows) ?
        'Radio show updated successfully' :
        'Error in updating radio show';
    return { message };
}
module.exports = {
    createRadioShow,
    readRadioShows,
    readRadioShow,
    updateRadioShow
}