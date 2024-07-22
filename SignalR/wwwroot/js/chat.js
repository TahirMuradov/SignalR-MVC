"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;
  
//document.getElementById("ConnectionId").value = connection.ConnectionId
connection.on("receiveMessage", function (FromToConnectionId, message, SendToconnectionId) {

    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    li.textContent = SendToconnectionId == null || SendToconnectionId == undefined ? `${FromToConnectionId} <idli userin mesaji ${message}` : `${FromToConnectionId} <idli userin ${SendToconnectionId} idli istifadeciye gonderdiyi mesaji ${message}`;
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
    const connectionId = connection.connectionId;
    document.getElementById("ConnectionId").value = connectionId
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var CurrentUserConnectionId = document.getElementById("ConnectionId").value;
    var message = document.getElementById("messageInput").value;
    var SendToconnectionId = document.getElementById("SendToConnectionId").value;
    if (SendToconnectionId != undefined) {
        connection.invoke("SendMessage", CurrentUserConnectionId, message, SendToconnectionId).catch(function (err) {
            return console.error(err.toString());
        });
    }
    else {

        connection.invoke("SendMessage", CurrentUserConnectionId, message, null).catch(function (err) {
        return console.error(err.toString());
    });
    }
    event.preventDefault();
});