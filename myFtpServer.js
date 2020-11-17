/////////////////

const readline = require('readline');
const net = require('net');
const fs = require('fs');
var user = "";

const file = JSON.parse(fs.readFileSync('users.json','utf-8'));



const server = net.createServer(function (socket) {
    console.log("New connection");

    


    socket.on('data', (data) => {

        console.log("received: " + data);
        
        const [directive,  parameter] = data.toString().split(" ");

        console.log("directive: " + directive);
        console.log("parameter: " + parameter )

        
        switch(directive) {
            case 'USER':
                var i = 0;
                file.forEach(element => {
                    console.log(element.name);
                    console.log(parameter);
                    if (element.name == parameter)
                        i++;
                    console.log(i)
                })
                if (i == 0)
                    socket.write("Wrong username");
                if (i > 0){
                    socket.write('200 Successfully connected');
                    user = parameter;
                }
                break;
            case 'PASS':
                var i = 0;
                file.forEach(element => {
                    if (element.password == parameter && element.name == user)
                        i++;
                })
                if (i == 0)
                    socket.write("Wrong password")
                if (i > 0)
                    socket.write("You've been authenticated");
                // check password
                // if true
                break;
            
            case 'LIST':
                break;
            case 'CWD':
                break;
            case 'RETR':
                break;
            case 'STOR':
                break;
            case 'PWD' :
                break;
            case 'HELP' :
                break;
            case 'QUIT':
                break;
        } 
    
    });
    


    // listener
    // socket.on('data', (data) => {
    //     console.log(`Received: ${data}`);
    // });


});

server.listen(5000, () => {
    console.log("Server started on port 5000")
});


function getUser(){
// retourne la liste des users
    return 0;
}