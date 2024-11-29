import './App.css';
import './styles.css';
import Header from './header';
import ChatArea from './ChatArea';
import ChatFooter from './ChatFooter';
import { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  return (
    <div className="app-container">
      <div className="animated-background"></div>
      <Header />
      <ChatArea messages={messages} />
      <ChatFooter addMessage={addMessage} />
    </div>
  );
}

export default App;