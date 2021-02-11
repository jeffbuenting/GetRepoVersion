const github = require('@actions/github');
const core = require('@actions/core')
const fs = require('fs');

var VerType = ''
var BadgeMessage = ''
var CurrentVersion = ''

// package.json
const JSONPackage = require('./package.json');
const { cachedDataVersionTag } = require('v8');
if (JSONPackage) {
    CurrentVersion = JSONPackage.version
    VerType = 'package.json'
}

//Powershell Module Manifest
console.log("github.repo")
console.log (github.repository)

const RepoUserandName =  github.repository
//const SplitRepoName = RepoUserandName.split('/')

//const PSModuleManifest = `${SplitRepoName}.psd1`
//const manifestcontent = fs.readFileSync(PSModuleManifest, 'utf8')

//if (manifestcontent) {
//    var RegexMatchGroups = manifestcontent.match("ModuleVersion = '(.*)'");
//    CurrentVersion = RegexMatchGroups[1]
//    VerType = 'modulemanifest'
//}

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
}

//assume versions in the files (currentversion) is more correct than the Badge version (BadgeMessage).  otherwise if only badge version set that to Current Version
if (CurrentVersion = '') {
    console.log('Setting Current version to Badge Version')

    CurrentVersion = BadgeMessage
}

//Throw error if CurrentVersion is ''.  This means version was not found in any file.
if (CurrentVersion = '') {
    core.setFailed('Error: missing README.md or one of the config / manifest files.');
}

core.setOutput('VersionType', VerType);
core.setOutput('Version', CurrentVersion);
