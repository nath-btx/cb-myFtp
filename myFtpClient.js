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
        console.log(data.toString());
        if(data.toString() != "Wrong username")
            Menu();
        
    });

    rl.question("Enter your username \n", (name) => {
        client.write("USER " + name);
    });

    rl.on('line', (data) => {
        client.write(data);
    })


function Menu() {
    console.log("What do you want to do ??");
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



    
        // rl.question("What do you want to do ?", (data) => {
        //     client.write(data);
        // })
    

    
    
    // rl.prompt("What is your password ? \n", (pswrd) => {
    //     client.write("PSWRD " + pswrd);
    //     rl.close();
    // })

    
   




// client.on('data', (data) => {
//     console.log(data.toString());
// });





// client.connect(/* port */5000,/*host*/'127.0.0.1',/* event listener */ () => {
//     console.log('connected')
//     client.write(/* Buffer */ "Hello from client")

// })

// client.on(/* event */ 'data',/* listener */ (data) => {
//     console.log(data.toString());

// })