import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

const ChatPanel = () => {
  // State management
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'Player 2', content: 'I think Player 3 is suspicious...', timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Handle message submission
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Add new message to the messages array
    setMessages([
      ...messages,
      { 
        sender: 'You', 
        content: newMessage.trim(),
        timestamp: new Date()
      }
    ]);
    
    // Clear input field
    setNewMessage('');
    
    // Simulate response (for demo purposes)
    setTimeout(() => {
      const responses = [
        "I agree, very suspicious behavior.",
        "Let's wait and see what happens next round.",
        "I think we should vote them out now!",
        "I don't know, I think Player 1 is more suspicious."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          sender: 'Player ' + Math.floor(Math.random() * 3 + 2), // Random player 2-4
          content: randomResponse,
          timestamp: new Date()
        }
      ]);
    }, 1000);
  };
  
  // Handle pressing Enter to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {showChat && (
        <div className="w-96 border-l border-primary/20 bg-card/30 backdrop-blur-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-medieval">Chat</h2>
            <button 
              onClick={() => setShowChat(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
          
          <div className="h-[calc(100vh-12rem)] flex flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto mb-4 pr-2">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`rounded-lg p-3 ${
                    msg.sender === 'You' 
                      ? 'bg-primary/30 ml-8' 
                      : 'bg-black/30'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white/80 text-sm">{msg.sender}</span>
                    <span className="text-white/50 text-xs">{formatTime(msg.timestamp)}</span>
                  </div>
                  <p>{msg.content}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-black/50 border border-primary/50 rounded px-4 py-2 text-white placeholder:text-white/50"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                className="btn-primary px-4"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-4 right-4 p-3 bg-primary/80 hover:bg-primary/90 rounded-full shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default ChatPanel;