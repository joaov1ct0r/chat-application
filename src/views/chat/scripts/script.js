const socket = io("http://0.0.0.0:3001");

var listMessages = [];

document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", () => {
    sendNewMessage();
  });
});

function sendNewMessage() {
  const user = document.getElementById("userInput").value;

  if (!user) {
    alert("Defina um usuario!");

    return;
  }

  const message = document.getElementById("text").value;

  socket.emit("new_message", { from: user, message });

  document.getElementById("text").value = "";
}

socket.on("new connection", ({ from, message }) => {
  listMessages += `<li>${from}:${message}</li>`;
});

socket.on("welcome", ({ from, message }) => {
  listMessages += `<li>${from}:${message}</li>`;
});

socket.on("messages", ({ from, message }) => {
  listMessages += `<li>${from}:${message}</li>`;
});

function handleMessages() {
  const ul = document.getElementsByTagName("ul")[0];

  ul.innerHTML = listMessages
}

setInterval(() => {
  handleMessages();
}, 1000)
