import React, { useState } from 'react';
import { notificationService } from './NotificationService';
 
export const AdminPanel: React.FC = () => {
  const [message, setMessage] = useState('');
 
  const sendMessage = () => {
    if (message.trim()) {
      notificationService.notify(message);
      setMessage(''); // Clear input
    }
  };
 
  return (
<div>
<h3>Admin Panel</h3>
<input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
<button onClick={sendMessage}>Send Notification</button>
</div>
  );
};