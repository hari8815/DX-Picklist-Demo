
var program = require('commander');
var shell = require('shelljs');

program
    .version('0.1.0')

    .option('-l, --listOrgs', 'Create SalesforceDX Project')
    .option('-s, --setAlias [type]', 'Set Alias for SalesforceDX Org','')
    .option('-c, --createProject [type]', 'Create SalesforceDX Project', '')
    .option('-o, --openOrg [type]', 'Open Salesforce Org', '')
    .option('-r, --retrieveOrg [type]', 'Retrieve Salesforce Source', '')
    .option('-a, --auth [type]', 'Authenticate Salesforce', '')
    .option('-d, --deploy [type]', 'Deploy to DX Scratch [-d mdapipkg/unpackaged -u s1]', '')
    .option('-u, --unzip', 'Unzip DX metadata')
    .option('-x, --createScratch [type]', 'Create Salesforce Scratch Org', '')

    .parse(process.argv);



if (program.listOrgs) {
    var cmd = "sfdx force:org:list --all";
    console.log("Getting Org Details...");
    shell.exec(cmd);
}
if (program.createScratch) {
    var cmd = "sfdx force:org:create -f config/project-scratch-def.json -d 30 --setalias " + program.createScratch;
    console.log("Creating Salesforce Scratch Org...");
    shell.exec(cmd);
}
if (program.deploy) {
    var cmd = "sfdx force:mdapi:deploy  -w 10 " + program.deploy;
    console.log("Deploying meta to Scratch Org...");
    shell.exec(cmd);
}
if (program.setAlias) {
    var cmd = "sfdx force:alias:set " + program.setAlias;
    console.log("Setting alias " + program.setAlias + "...");
    shell.exec(cmd);
}
if (program.unzip) {
    var cmd = "unzip unpackaged.zip";
    console.log("unzipping...");
    shell.cd("mdapipkg");
    shell.exec(cmd);
}

if (program.createProject) {
    var cmd = "sfdx force:project:create --projectname " + program.createProject;
    console.log("Creating Project %s...", program.createProject);
    shell.exec(cmd);
}

if (program.openOrg) {
    var cmd = "sfdx force:org:open -u " + program.openOrg;
    console.log("Opening %s...", program.openOrg);
    shell.exec(cmd);
}

if (program.retrieveOrg) {
    var cmd = "sfdx force:mdapi:retrieve -r ./mdapipkg1  -k ./package.xml -u " + program.retrieveOrg;
    console.log("Retrieving Source from  %s...", program.retrieveOrg);
    //shell.cd("dx");
    shell.exec(cmd);
}


if (program.auth) {
    var url = "";
    if (program.auth && program.auth == 'test') {
        url = "https://test.salesforce.com/";
    } else {
        url = "https://login.salesforce.com/";
    }
    var cmd = "sfdx force:auth:web:login -d -a dx";
    console.log("Authenticating Salesforce");
    shell.exec(cmd);
}