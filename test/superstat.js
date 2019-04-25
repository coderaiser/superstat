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
    const {stat, lstat} = fs;
    const data = await superstat(__filename);
    
    fs.stat = stat;
    fs.lstat = lstat;
    
    t.ok(data, 'should return stat');
    t.end();
});

test('superstate: symbolic link', async (t) => {
    const {stat, lstat} = fs;
    
    const newStat = stub((name, fn) => fn(null, {
        isDirectory: function() {},
    }));
    
    const newlStat = stub((name, fn) => fn(null, {
        isSymbolicLink: () => true
    }));
    
    fs.stat = newStat;
    fs.lstat = newlStat;
    
    const superstat = reRequire('..');
    await superstat(__filename);
    
    fs.stat = stat;
    fs.lstat = lstat;
    
    t.ok(newlStat.called, 'should call lstat');
    t.end();
});

