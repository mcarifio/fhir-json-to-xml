// fhir-json-to-xml-mocha.js

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var fs = require('fs');
var process = require('process');
var program = require('commander');

var fhir2xml = require('./../dist/node-fhir-convert');
var fhir2xmlParser = new fhir2xml.FHIRConverter(2);  // xml indent 2 spaces

describe("fhir-json-to-xml", function() {

    it("should have a node FHIRConverter function", function() {
        fhir2xml.should.be.an.object;
        fhir2xml.FHIRConverter.should.be.a('function');
    });

    it("should convert FHIR JSON demographics to FHIR XML", function() {
        testJson2Xml( __dirname + '/demographic.json',
                      __dirname + '/data/demographic.xml');
    });

    it("should convert a single FHIR JSON medication to FHIR XML", function() {
        testJson2Xml( __dirname + '/medication.json',
                      __dirname + '/data/medication.xml');
    });

    it("should convert a FHIR JSON bundle to FHIR XML", function() {
        testJson2Xml( __dirname + '/testBundle.json',
                      __dirname + '/data/testBundle.xml');
    });

});

function testJson2Xml( jsonPath, xmlPath ) { 
    var cmumpsJson = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    var xml = fhir2xmlParser.toXML(cmumpsJson);

    var expectedXml = fs.readFileSync(xmlPath, 'utf-8');
    xml.should.equal(expectedXml);
}
