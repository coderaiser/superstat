'use strict';

const {
    lstat,
    stat,
} = require('fs').promises;

const {assign} = Object;

module.exports = async (fullName) => {
    check(fullName);
    
    const info = await lstat(fullName);
    
    if (info.isSymbolicLink()) {
        const newInfo = await stat(fullName);
        
        assign(info, {
            isDirectory: newInfo.isDirectory.bind(newInfo),
        });
    }
    
    return info;
};

function check(fullName) {
    if (typeof fullName !== 'string')
        throw Error('name should be a string!');
}

