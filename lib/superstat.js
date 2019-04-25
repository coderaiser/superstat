'use strict';

const {promisify} = require('util');
const fs = require('fs');

const lstat = promisify(fs.lstat);
const stat = promisify(fs.stat);

const {assign} = Object;

module.exports = async (name) => {
    check(name);
    
    const info = await lstat(name);
    
    if (info.isSymbolicLink()) {
        const newInfo = await stat(name);
        assign(info, {
            isDirectory: newInfo.isDirectory.bind(newInfo),
        });
    }
    
    return info;
};

function check(name) {
    if (typeof name !== 'string')
        throw Error('name should be a string!');
}

