type Observer = (message: string) => void;
 
class NotificationService {
  private observers: Observer[] = [];
 
  // Subscribe an observer
  subscribe(observer: Observer) {
    this.observers.push(observer);
  }
 
  // Unsubscribe an observer
  unsubscribe(observer: Observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
 
  // Notify all observers
  notify(message: string) {
    this.observers.forEach((observer) => observer(message));
  }
}
 
export const notificationService = new NotificationService();