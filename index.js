const github = require('@actions/github');
const core = require('@actions/core')
const fs = require('fs');

var VerType = ''
var BadgeMessage = ''
var CurrentVersion = ''
var manifestcontent = null

fs.readdir('.');

// package.json
const JSONPackage = require('./package.json');


if (JSONPackage) {
    console.log('Package.json found.  Lookeing at that version.')

    CurrentVersion = JSONPackage.version
    VerType = 'package.json'
    console.log(CurrentVersion)
}

//Powershell Module Manifest
const RepoUserandName = process.env.GITHUB_REPOSITORY
console.log(RepoUserandName);

try {
    manifestcontent = fs.readFileSync(`${(process.env.GITHUB_REPOSITORY).split('/')[1]}.psd1`, 'utf8');
} catch (e) {
    // ignore errors
}

if (manifestcontent) {
    console.log( 'PS Module manifest found.  Looking at its Version.')

    var RegexMatchGroups = manifestcontent.match("ModuleVersion = '(.*)'");
    CurrentVersion = RegexMatchGroups[1]
    VerType = 'modulemanifest'

    console.log(CurrentVersion)
}

// readme
const readmecontent = fs.readFileSync('./README.md', 'utf8')

if (readmecontent) {
    console.log('Found README.md.  Looking for Version badge.');

    var RegexMatchGroups = readmecontent.match('https://img.shields.io/badge/(Version)-(.*)-(.*)');
    const BadgeLabel = RegexMatchGroups[1]
    BadgeMessage = RegexMatchGroups[2]
    const BadgeColor = RegexMatchGroups[3]

    if (!VerType) {
        const VerType = 'readme'
    }

    console.log('BadgeMessage')
}

//assume versions in the files (currentversion) is more correct than the Badge version (BadgeMessage).  otherwise if only badge version set that to Current Version
if (CurrentVersion == '') {
    console.log('Setting Current version to Badge Version')

    CurrentVersion = BadgeMessage
}

//Throw error if CurrentVersion is ''.  This means version was not found in any file.
if (CurrentVersion == '') {
    core.setFailed('Error: missing README.md or one of the config / manifest files.');
}

console.log(`VerType = ${VerType}`)
console.log(CurrentVersion)
console.log(`Version = ${CurrentVersion}`)

core.setOutput('VersionType', VerType);
core.setOutput('Version', CurrentVersion);
