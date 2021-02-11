const github = require('@actions/github');
const core = require('@actions/core')
const fs = require('fs');

// package.json
const JSONPackage = require('./package.json');
const { cachedDataVersionTag } = require('v8');
if (JSONPackage) {
    var CurrentVersion = JSONPackage.version
    const VerType = 'package.json'
}

//Powershell Module Manifest
github.repository

const RepoUserandName =  github.repository
//const SplitRepoName = RepoUserandName.split('/')

//const PSModuleManifest = `${SplitRepoName}.psd1`
//const manifestcontent = fs.readFileSync(PSModuleManifest, 'utf8')

//if (manifestcontent) {
//    var RegexMatchGroups = manifestcontent.match("ModuleVersion = '(.*)'");
//    var CurrentVersion = RegexMatchGroups[1]
//    const VerType = 'modulemanifest'
//}

// readme
const readmecontent = fs.readFileSync('./README.md', 'utf8')

console.log(readmecontent)

if (readmecontent) {
    var RegexMatchGroups = readmecontent.match('https://img.shields.io/badge/(Version)-(.*)-(.*)');
    const BadgeLabel = RegexMatchGroups[1]
    const BadgeMessage = RegexMatchGroups[2]
    const BadgeColor = RegexMatchGroups[3]

    if (!VerType) {
        const VerType = 'readme'
    }
}

if (CurrentVersion && BadgeMessage) {
    //assume versions in the files (currentversion) is more correct than the Badge version (BadgeMessage)
    if (CurrentVersion < BadgeMessage) {
        CurrentVersion = BadgeMessage
    }
} else {
    core.setFailed('Error: missing README.md or one of the config / manifest files.');
}

core.setOutput('VersionType', VerType);
core.setOutput('Version', CurrentVersion);
