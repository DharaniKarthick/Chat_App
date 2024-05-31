"use strict";

//<script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/5.0.0/signalr.min.js"></script>

var connection = new signalR.HubConnectionBuilder().withUrl("/chatsocket").build();

connection.on("ReceiveMessage", function (user, message) {
    var encodedUser = $("<div />").text(user).html();
    var encodedMessage = $("<div />").text(message).html();
    var li = document.createElement('li');
    var currentUser = $("#username").val();
    // Add the username and message content to the list item
    li.innerHTML = `<span class="username">` + encodedUser + `</span><br/>`
                   +`<span class="message">` + encodedMessage + `</span>`;

    // Check if the message is from the current user
    if (encodedUser == currentUser) {
        // Add the "sent" class to align the message to the right
        li.classList.add('sent');
    }
    $("#messages").append(li);
});

connection.start().catch(function (err) {
    console.error(err.toString());
});

$("#sendButton").click(function () {
    var user = $("#username").val();
    var message = $("#messageInput").val();
    connection.invoke("SendMessage", user, message).catch(function (err) {
        console.error(err.toString());
    });
    $("#messageInput").val("");
});