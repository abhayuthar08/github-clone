const yargs = require('yargs');
const { hideBin } = require("yargs/helpers");

const { initRepo } = require('./controllers/init.js');
const { addRepo } = require('./controllers/add.js');
const { commitRepo } = require('./controllers/commit.js');
const { pushRepo } = require('./controllers/push.js');
const { pullRepo } = require('./controllers/pull.js');
const { revertRepo } = require('./controllers/revert.js');

yargs(hideBin(process.argv))
    .command( "init" , "the command is for initialize new repo" , {} ,   initRepo)
    .command( "add <file>" , "the command is to add repo" , (yargs)=> {
        yargs.positional("file" , {
            describe: " File to add to the staging area",
            type : "string",
        });
    }, 
        (argv) => {
            addRepo(argv.file);
        } )
        
    .command("commit <message>" , "Commit the staged files" , (yargs) => {
        yargs.positional("message",{
            describe: "Commit message",
            type: "string",
            })
    }, 
    (argv) => {
        commitRepo(argv.message);
    })
    .command("push","Push commands to S3", {} , pushRepo)
    .command("pull", "Pull commits from S3", {} , pullRepo)
    .command(
        "revert <commitId>",
        "Revert to a specific commit",
        (yargs) => {
            yargs.positional("commitId",{
                describe : "commit Id to revert to",
                type : "string",
            })
        },  revertRepo, 
    )

    .demandCommand(1 , "You need at least one command").help().argv;