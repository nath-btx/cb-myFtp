/////////////////
const port = process.argv[2];

const path = require('path');
const readline = require('readline');
const net = require('net');
const fs = require('fs');
var user = "";

const file = JSON.parse(fs.readFileSync('users.json','utf-8'));

if (!port) {
    console.log("usage : node myFtpServer.js <PORT>");
    process.exit(0)
  }


const server = net.createServer( (socket) => {
    console.log("New connexion");

    


    socket.on('data', (data) => {

        console.log("received: " + data);
        
        const [directive,  parameter] = data.toString().split(" ");

        console.log("directive: " + directive);
        console.log("parameter: " + parameter )

        
        switch(directive) {
            case 'FIRSTCONNECTION':
                var i = 0;
                file.forEach(element => {
                    if (element.name == parameter)
                        i++;
                })
                if (i > 0) {
                    socket.write('Successfully connected');
                    socket.write("menu");
                }
                else {
                    socket.write("No username match");
                    socket.end("Good Bye");
                }
                    user = parameter;
                    break;
            case 'USER':
                var i = 0;
                file.forEach(element => {
                    console.log(element.name);
                    console.log(parameter);
                    if (element.name == parameter)
                        i++;
                })
                if (i > 0) {
                    socket.write('This user exists');
                }
                else {
                    socket.write("Username does not match");
                }
                    socket.write("menu");
                    break;
                
            case 'PASS':
                var i = 0;
                console.log("user : " + user);
                file.forEach(element => {
                    if (element.password == parameter && element.name == user)
                        i++;
                })
                if (i > 0){
                    socket.write("You've been authenticated");
                    socket.write("menu");
                }
                else{
                    socket.write("Wrong password\n");
                    socket.write("menu");
                }

                
                // check password
                // if true
                break;
            
            case 'LIST':
                fs.readdir(process.cwd(), (err, files) => {
                    files.forEach(file => {
                      socket.write(file + "\n");
                    });
                  });
                socket.write("menu");
                break;
            case 'CWD':
                break;
            case 'RETR':
                duplicate(parameter);
                socket.write("File duplicated correctly");
                socket.write("menu");
                break;
            case 'STOR':
                duplicate(parameter);
                socket.write("File duplicated correctly");
                socket.write("menu");
                break;
            case 'PWD' :
                socket.write(process.cwd());
                socket.write("menu");
                break;
            case 'HELP' :
                socket.write("User -> Checks if the user exists\nPASS -> Enter your password to connect and have access to the other commands\nLIST -> Lists the current directory of the server\nCWD  -> Changes the current directory of the server\nRETR -> Transfers a copy of the file from server to client\nSTOR -> Transfers a copy of the file from the client to the server\nPWD  -> Displays the name of the current directory of the server\nHELP -> Sends helpful information\nQUIT -> Closes the connection and stops the program");
                socket.write("menu");
                break;
                
            case 'QUIT':
                socket.end('Good Bye ');
                break;
            default:
                socket.write("Invalid command");
                socket.write("menu");
                break;
                
        } 
    
    });
    

});

server.listen(port, () => {
    console.log("Server started on port " + port)
});

function duplicate(filename) {
    const { name, ext } = path.parse(filename)
  
    const readStream = fs.createReadStream(filename)
    const writeStream = fs.createWriteStream(`${name}.copy${ext}`)
  
    readStream.pipe(writeStream)

  }

  
