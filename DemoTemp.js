import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import  getChatbotResponse  from './chatbot';

function App() {
  const [messages, setMessages] = useState([]);

  async function handleSendMessage(message) {
    setMessages([...messages, { text: message, from: 'user' }]);
    const response = await getChatbotResponse(message);
    setMessages([...messages, { text: response, from: 'chatbot' }]);
    console.log(response);
  }
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <strong>{message.from}: </strong>
          {message.text}
        </div>
      ))}
      <input
        type="text"
        placeholder="Type your message..."
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            handleSendMessage(event.target.value);
            event.target.value = '';
          }
        }}
      />
    </div>
  );
}

export default App;


// import React, { useState } from 'react';
// import { getChatbotResponse } from './chatbot';

// function Chat() {
//   const [messages, setMessages] = useState([]);

//   async function handleSendMessage(message) {
//     setMessages([...messages, { text: message, from: 'user' }]);
//     const response = await getChatbotResponse(message);
//     setMessages([...messages, { text: response, from: 'chatbot' }]);
//   }

//   return (
//     <div>
//       {messages.map((message, index) => (
//         <div key={index}>
//           <strong>{message.from}: </strong>
//           {message.text}
//         </div>
//       ))}
//       <input
//         type="text"
//         placeholder="Type your message..."
//         onKeyPress={(event) => {
//           if (event.key === 'Enter') {
//             handleSendMessage(event.target.value);
//             event.target.value = '';
//           }
//         }}
//       />
//     </div>
//   );
// }
