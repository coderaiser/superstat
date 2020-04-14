'use strict';

const fs = require('fs');

const test = require('supertape');
const superstat = require('..');
const tryToCatch = require('try-to-catch');
const stub = require('@cloudcmd/stub');
const {reRequire} = require('mock-require');

test('superstate: no args', async (t) => {
    const [e] = await tryToCatch(superstat);
    
    t.equal(e.message, 'name should be a string!');
    t.end();
});

test('superstate: not symbolic link', async (t) => {
    const data = await superstat(__filename);
    
    t.ok(data, 'should return stat');
    t.end();
});

test('superstate: symbolic link', async (t) => {
    const {stat, lstat} = fs.promises;
    
    const newStat = stub().returns({
        isDirectory() {},
    });
    
    const newlStat = stub().returns({
        isSymbolicLink: () => true,
    });
    
    fs.promises.stat = newStat;
    fs.promises.lstat = newlStat;
    
    const superstat = reRequire('..');
    await superstat(__filename);
    
    fs.promises.stat = stat;
    fs.promises.lstat = lstat;
    
    t.ok(newlStat.called, 'should call lstat');
    t.end();
});

