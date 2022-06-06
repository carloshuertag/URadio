const db = require('./db');
const helper = require('../helper');
const config = require('../config');
async function signInRadioShowManager(page = 1, mail, pswd) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `select managerId from radioShowManager where mail = ? and pswd = ? limit ${offset},${config.listPerPage}`, [mail, pswd]
    );
    const data = helper.emptyOrRows(rows);
    if (data.length === 0) {
        const existsResult = await db.query(`select managerId from radioShowManager where mail = ? limit ${offset},${config.listPerPage}`, [mail]);
        const existsData = helper.emptyOrRows(existsResult);
        if (existsData.length === 0) {
            data = { message: 'mail' };
        } else {
            data = { message: 'password' };
        }
    }
    const meta = { page };
    return {
        data,
        meta
    }
}
async function createRadioShowManager(radioShowManager) {
    const result = await db.query(
        `insert into radioShowManager (mail, pswd) values (?, ?)`, [radioShowManager.mail, radioShowManager.pswd]
    );
    let data = { status: ``, message: `` };
    data.status = (result.affectedRows) ? `Success` : `Èrror`;
    data.message = (data.status == `Success`) ?
        'Radio show manager created successfully' :
        'Error in creating radio show managers';
    return { data };
}
async function updateRadioShowManager(mail, radioShowManager) {
    const result = await db.query(
        `update radioShowManager set pswd = ? where mail = '${mail}'`, [radioShowManager.pswd]
    );
    let message = (result.affectedRows) ?
        'Radio show manager updated successfully' :
        'Error in updating radio show managers';
    return { message };
}

module.exports = {
    signInRadioShowManager,
    createRadioShowManager,
    updateRadioShowManager
}