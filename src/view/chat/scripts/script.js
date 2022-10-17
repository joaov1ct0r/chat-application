const ul = document.getElementsByTagName("ul")[0];

const socket = io("http://0.0.0.0:3001");

document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", () => {
    sendNewMessage();
  });
});

socket.on("new connection", (data) => {
  handleNewConnection(data);
});

function handleNewConnection({ msg }) {
  const newMessage = `<li>Server: ${msg}</li>`;

  ul.innerHTML += newMessage;
}

socket.on("welcome", (data) => {
  handleOwnConnection(data);
});

function handleOwnConnection({ msg }) {
  const newMessage = `<li>Server: ${msg}</li>`;

  ul.innerHTML += newMessage;
}

function sendNewMessage() {
  const user = document.getElementById("userInput").value;

  if (!user) {
    alert("Defina um usuario!");

    return;
  }

  const message = document.getElementById("text").value;

  socket.emit("new_message", { user, msg: message });

  document.getElementById("text").value = "";
}

socket.on("messages", (data) => {
  handleMessages(data);
});

function handleMessages(data) {
  let listMessages = [];

  data.forEach((obj) => {
    listMessages += `<li>${obj.user}: ${obj.msg}</li>`;
  });

  ul.innerHTML = listMessages;
}
