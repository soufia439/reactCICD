import React, { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './Components/Button'
import Profile from './Components/Profile'
import { AdminPanel } from './Components/AdminPanel'
import { UserNotification } from './Components/UserNotification'
import { Tab } from './Components/Tab'
import { TabList } from './Components/TabList'
import { TabPanel } from './Components/TabPanel'
import { TabPanels } from './Components/TabPanels'
import { Tabs } from './Components/Tabs'


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }


// Button components
const PrimaryButton = () => <button className="primary">Primary</button>;
const SecondaryButton = () => <button className="secondary">Secondary</button>;
 
// Factory function
const ButtonFactory = (type: "primary" | "secondary") => {
  if (type === "primary") return <PrimaryButton />;
  if (type === "secondary") return <SecondaryButton />;
  return null;
};
 
const App4 = () => {
  return (
<div>
      {ButtonFactory("primary")}
      {ButtonFactory("secondary")}
</div>
  );
};
 


interface PaymentProcessor {
  processPayment(amount: number): void;
}
 
class CreditCardPayment implements PaymentProcessor {
  processPayment(amount: number) {
    console.log(`Processing credit card payment of $${amount}`);
  }
}
 
class PayPalPayment implements PaymentProcessor {
  processPayment(amount: number) {
    console.log(`Processing PayPal payment of $${amount}`);
  }
}
 
class BankTransferPayment implements PaymentProcessor {
  processPayment(amount: number) {
    console.log(`Processing bank transfer payment of $${amount}`);
  }
}
 
// Factory function to choose payment processor
function createPaymentProcessor(type: string): PaymentProcessor {
  if (type === 'credit-card') return new CreditCardPayment();
  if (type === 'paypal') return new PayPalPayment();
  if (type === 'bank-transfer') return new BankTransferPayment();
  throw new Error('Unknown payment type');
}
 
// React Component with Radio Buttons
const PaymentComponent = () => {
  const [paymentType, setPaymentType] = React.useState<string>('credit-card');
  const [amount, setAmount] = React.useState<number>(0);
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentProcessor = createPaymentProcessor(paymentType);
    paymentProcessor.processPayment(amount);
  };
 
  return (
<div>
<h2>Select Payment Method</h2>
<form onSubmit={handleSubmit}>
        {/* Radio Buttons for Payment Methods */}
<div>
<label>
<input
              type="radio"
              value="credit-card"
              checked={paymentType === 'credit-card'}
              onChange={(e) => setPaymentType(e.target.value)}
            />
            Credit Card
</label>
</div>
<div>
<label>
<input
              type="radio"
              value="paypal"
              checked={paymentType === 'paypal'}
              onChange={(e) => setPaymentType(e.target.value)}
            />
            PayPal
</label>
</div>
<div>
<label>
<input
              type="radio"
              value="bank-transfer"
              checked={paymentType === 'bank-transfer'}
              onChange={(e) => setPaymentType(e.target.value)}
            />
            Bank Transfer
</label>
</div>
 
        {/* Input for Amount */}
<div>
<label>
            Amount: 
<input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
</label>
</div>
 
        {/* Submit Button */}
<button type="submit">Pay</button>
</form>
</div>
  );
};
 
const App1 = () => {
  return (
<div>
<PaymentComponent />
</div>
  );
};

const withClickTracker = (WrappedComponent) => {
  return (props) => {
    const [clicks, setClicks] = React.useState(0);
 
    const handleClick = () => {
      setClicks(clicks + 1); // Increment click count
      console.log(`Button clicked ${clicks + 1} times`);
    };
 
    // Pass the click handler and other props to the wrapped component
    return <WrappedComponent onClick={handleClick} {...props} />;
  };
};
 
const TrackedButton = withClickTracker(Button);
 
const App2 = () => {
  return (
<div>
<h1>Higher-Order Component Example</h1>
<TrackedButton label="Click Me!" />
</div>
  );
};
const WithAuth=(WrappedComp)=>{
return()=>{
  const loggedIn=false;
  const style={
    border: '2px solid black',   
    padding: '10px',             
    borderRadius: '5px',
    color:loggedIn?'green':'red',
  }
  if(!loggedIn){
    return <div style={style}>Please login to view this page</div>
  }
 
  return (
    <div style={style}>
    <WrappedComp />
    </div>
  )
 
  

};
};

const ProtectedProfile=WithAuth(Profile);
const App=()=>{
  return(
    <div>
    <ProtectedProfile />
    </div>
  )
}

// Render Props Component
const ClickTracker: React.FC<{
  render: (clicks: number, handleClick: () => void) => React.ReactNode;
}> = ({ render }) => {
  const [clicks, setClicks] = useState(0);
 
  const handleClick = () => {
    setClicks(clicks + 1); // Increment click count
    console.log(`Button clicked ${clicks + 1} times`);
  };
 
  return <>{render(clicks, handleClick)}</>;
};
 
const App10: React.FC = () => {
  return (
<div>
<h1>Render Props Example</h1>
      {/* Use ClickTracker with render props */}
<ClickTracker
        render={(clicks, handleClick) => (
<>
<p>Button clicked {clicks} times</p>
<Button label="Click Me!" onClick={handleClick} />
</>
        )}
      />
</div>
  );
};

// Render Props Component
const AuthGuard: React.FC<{
  render: (isLoggedIn: boolean) => React.ReactNode;
}> = ({ render }) => {
  const isLoggedIn = false; // Simulating login status
 
  return <>{render(isLoggedIn)}</>;
};
 
 
const App11: React.FC = () => {
  return (
<div>
<AuthGuard
        render={(isLoggedIn) =>
          isLoggedIn ? <Profile /> : <div>Please log in to view this page.</div>
        }
      />
</div>
  );
};


// Render Props Component


const BorderWrapper: React.FC<{

  render: React.ReactNode;

}> = ({ children }) => {

  return (
<div style={{ border: "2px solid black", padding: "10px" }}>

      {children}
</div>

  );

};
 
const SimpleComponent: React.FC<{ text: string }> = ({ text }) => <p>{text}</p>;
 
const App12: React.FC = () => {

  return (
<BorderWrapper>
<SimpleComponent text="This is a bordered component!" />
</BorderWrapper>

  );

};
 
function useHover(): {
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
} {
  const [isHovered, setIsHovered] = useState<boolean>(false);
 
  const onMouseEnter = (): void => setIsHovered(true);
  const onMouseLeave = (): void => setIsHovered(false);
 
  return { isHovered, onMouseEnter, onMouseLeave };
}
 
// TypeScript version of the App component
const App13: React.FC = () => {
  const { isHovered, onMouseEnter, onMouseLeave } = useHover();
 
  return (
<div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
<button>{isHovered ? "Hovered!" : "Hover over me!"}</button>
</div>
  );
};

// Custom hook for data fetching
function useDataFetcher(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [url]);
 
  return { data, loading, error };
}
 
const App14: React.FC = () => {
  const { data, loading, error } = useDataFetcher("https://jsonplaceholder.typicode.com/users");
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
 
  return (
<ul>
      {data.map((user) => (
<li key={user.id}>{user.name}</li>
      ))}
</ul>
  );
};

function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [url]);
 
  return render({ data, loading, error });
}
 
const App15: React.FC = () => {
  return (
<DataFetcher
      url="https://jsonplaceholder.typicode.com/users"
      render={({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
 
        return (
<ul>
            {data.map((user) => (
<li key={user.id}>{user.name}</li>
            ))}
</ul>
        );
      }}
    />
  );
};

// Higher-Order Component for fetching data
function withDataFetching(WrappedComponent, url) {
  return function WithDataFetching(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 
    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }, [url]);
 
    return <WrappedComponent data={data} loading={loading} error={error} {...props} />;
  };
}
 
function UserList({ data, loading, error }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
 
  return (
<ul>
      {data.map((user) => (
<li key={user.id}>{user.name}</li>
      ))}
</ul>
  );
}
 
// Wrap the component
const UserListWithData = withDataFetching(UserList, "https://jsonplaceholder.typicode.com/users");
 
const App16: React.FC = () => {
  return <UserListWithData />;
};

class UserSession {
  private static instance: UserSession;
  private user: { id: string; name: string } | null = null;
 
  private constructor() {
    // Private constructor to prevent instantiation
  }
 
  static getInstance(): UserSession {
    if (!UserSession.instance) {
      UserSession.instance = new UserSession();
    }
    return UserSession.instance;
  }
 
  login(user: { id: string; name: string }): void {
    this.user = user;
    console.log(`${user.name} has logged in.`);
  }
 
  logout(): void {
    console.log(`${this.user?.name} has logged out.`);
    this.user = null;
  }
 
  getUser(): { id: string; name: string } | null {
    return this.user;
  }
 
  isLoggedIn(): boolean {
    return this.user !== null;
  }
}
 
 
const App17: React.FC = () => {
  const session = UserSession.getInstance();
  //const session2 = UserSession.getInstance();
 
  //console.log(session===session2);
 
  const handleLogin = () => {
    session.login({ id: "123", name: "John Doe" });
  };
 
  const handleLogout = () => {
    session.logout();
  };
 
  const handleCheckSession = () => {
    const user = session.getUser();
    if (user) {
      console.log(`Logged in user: ${user.name}`);
    } else {
      console.log("No user logged in.");
    }
  };
 
  return (
<div>
<h1>Singleton User Session Example</h1>
<button onClick={handleLogin}>Login</button>
<button onClick={handleLogout}>Logout</button>
<button onClick={handleCheckSession}>Check Session</button>
</div>
  );
};

class ThemeManager {
  private static instance: ThemeManager; // The single instance
  public theme: string;
 
  private constructor() {
    this.theme = "light"; // Default theme
  }
 
  static getInstance() {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager(); // Create the instance if it doesn't exist
    }
    return ThemeManager.instance; // Return the single instance
  }
 
  setTheme(newTheme: string) {
    this.theme = newTheme;
  }
 
  getTheme() {
    return this.theme;
  }
}
 
const App18: React.FC = () => {
  const themeManager = ThemeManager.getInstance();
 
  return (
<div>
<h1>Current Theme: {themeManager.getTheme()}</h1>
<button onClick={() => themeManager.setTheme("dark")}>
        Change to Dark Theme
</button>
</div>
  );
};

const App19: React.FC = () => {

  return (
<div>
<h1>Observer Pattern Example</h1>
<AdminPanel />
<UserNotification />
</div>

  );

};
 

const App20: React.FC = () => {

  return (
<Tabs>
<TabList>
<Tab index={0} label="Tab 1" />
<Tab index={1} label="Tab 2" />
<Tab index={2} label="Tab 3" />
</TabList>
<TabPanels>
<TabPanel index={0}>Content for Tab 1</TabPanel>
<TabPanel index={1}>Content for Tab 2</TabPanel>
<TabPanel index={2}>Content for Tab 3</TabPanel>
</TabPanels>
</Tabs>

  );

};
 
export default App20;
