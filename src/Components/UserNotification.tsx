import React, { useEffect, useState } from 'react';
import { notificationService } from './NotificationService';
 
export const UserNotification: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
 
  useEffect(() => {
    // Observer function
    const handleNewMessage = (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };
 
    // Subscribe to notifications
    notificationService.subscribe(handleNewMessage);
 
    // Cleanup on unmount
    return () => {
      notificationService.unsubscribe(handleNewMessage);
    };
  }, []);
 
  return (
<div>
<h3>User Notifications</h3>
<ul>
        {messages.map((msg, index) => (
<li key={index}>{msg}</li>
        ))}
</ul>
</div>
  );
};