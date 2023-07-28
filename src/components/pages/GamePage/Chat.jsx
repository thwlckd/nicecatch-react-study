import { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Chat.scss';

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (message != '') {
      const messageData = {
        room,
        author: username,
        message,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit('send_message', messageData);
      setMessageList((prev) => [...prev, messageData]);
      setMessage('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <>
      <div className="chat-container">
        <h3>Nice Chat</h3>
        <ScrollToBottom className="message-container">
          {messageList.map((messageData, index) => {
            return (
              <div
                key={index}
                id={username === messageData.author ? 'you' : 'other'}
              >
                <span
                  className="message-content"
                  id={username === messageData.author ? 'you' : 'other'}
                >
                  {messageData.message}
                </span>
                <div className="message-meta">
                  <span>{`${messageData.author} ${messageData.time}`}</span>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
        <div className="chat-contoller">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button>&#9658;</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
