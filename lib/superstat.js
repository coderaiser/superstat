'use strict';

const {basename} = require('path');

const {
    lstat,
    stat,
} = require('fs').promises;

const {assign} = Object;

module.exports = async (fullName) => {
    check(fullName);
    
    const name = basename(fullName);
    
    const info = await lstat(fullName);
    
    if (info.isSymbolicLink()) {
        const newInfo = await stat(fullName);
        
        assign(info, {
            name,
            isDirectory: newInfo.isDirectory.bind(newInfo),
        });
    }
    
    return assign(info, {
        name,
    });
};

function check(fullName) {
    if (typeof fullName !== 'string')
        throw Error('name should be a string!');
}

