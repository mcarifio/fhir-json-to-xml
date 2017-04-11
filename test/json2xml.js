#!/usr/bin/env node
/**
 * A manual test tool for this package by
 * Mike Carifio <mike@carif.io> (https://mike.carif.io/)
 *
 * Syntax: 
 *   json2xml.js <a json file to test>
 * Example 
 *   ./json2xml.js demographic.json
 */

var fs = require('fs');
var process = require('process');
var program = require('commander');

var index = __dirname + '/../index.js';
var fhir2xml = require(index); // hacked version of fhir-convert.js that exports certain functions

program.parse(process.argv);
program.args.forEach(function(pathname) {
    var json = JSON.parse(fs.readFileSync(pathname, "utf8"));
    var parser = new fhir2xml.FHIRConverter(2);
    var xml = parser.toXML(json);
    console.log(xml);
});
