const Chat = ({ socket, username, room }) => {
  console.log(socket);
  return (
    <>
      <h3>Join A Chat</h3>
      <div>{username}</div>
      <div>{room}</div>
    </>
  );
};

export default Chat;
