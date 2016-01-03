#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const version = require('../package.json').version;
const ncp = require('ncp').ncp;
const cwd = process.cwd();
const source = './lib/template';

function creator (val) {
    const target = path.join(cwd, val);
    console.log(target);
    ncp(source, target, (err) => {
        if (err) return console.error(err);
        console.log('🚀  have fun!');
    });
}

program
    .version(version)
    .usage('jetpack --new <name>')
    .option('-n, --new <name>', 'create a new project', creator)
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program
        .outputHelp((txt) => {
            return txt;
        });
}
