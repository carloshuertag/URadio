const db = require('./db');
const helper = require('../helper');
const config = require('../config');
async function readRadioShowManagers(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `select mail, pswd from radioShowManager limit ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return {
        data,
        meta
    }
}
async function createRadioShowManager(radioShowManager) {
    const result = await db.query(
        `insert into radioShowManager (mail, pswd) values 
        ('${radioShowManager.mail}', '${radioShowManager.pswd}')`
    );
    let message = (result.affectedRows) ?
        'Radio show manager created successfully' :
        'Error in creating radio show managers';
    return { message };
}
async function updateRadioShowManager(mail, radioShowManager) {
    const result = await db.query(
        `update radioShowManager set pswd = '${radioShowManager.pswd}' where mail = '${mail}'`
    );
    let message = (result.affectedRows) ?
        'Radio show manager updated successfully' :
        'Error in updating radio show managers';
    return { message };
}
async function deleteRadioShowManager(mail) {
    const result = await db.query(
        `delete from radioShowManager where mail = '${mail}'`
    );
    let message = (result.affectedRows) ?
        'Radio show manager deleted successfully' :
        'Error in deleting radio show managers';
    return { message };
}

module.exports = {
    readRadioShowManagers,
    createRadioShowManager,
    updateRadioShowManager,
    deleteRadioShowManager
}