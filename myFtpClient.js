const net = require('net');
const readline = require('readline');


const client = new net.Socket()
var port = process.argv[3];
var host = process.argv[2];

if (!port || !host) {
    console.log("usage : node myFtpClient.js <host> <port>");
    process.exit(0)
}

client.connect(port, host, () => {
})

const rl = readline.createInterface({input: process.stdin, output: process.stdout });

    client.on('data', (data) => {
        if(data.toString() == "menu" ) {
            Menu();
        }
        else if (data.toString() == "No username match"){
            rl.close();
            console.log(data.toString());

        }
        else {
            console.log("\n" + data.toString() + "\n");
        }
    });

    rl.question("Enter your username\n", (name) => {
        client.write("FIRSTCONNECTION " + name);
    });

    rl.on('line', (data) => {
        client.write(data);
        if (data == "QUIT"){
            rl.close();
        }
    })


function Menu() {
    console.log("USER <name>");
    console.log("PASS <password>");
    console.log("LIST");
    console.log("CWD <directory>");
    console.log("RETR <filename>");
    console.log("STOR : <filename>");
    console.log("PWD");
    console.log("HELP");
    console.log("QUIT");
}


