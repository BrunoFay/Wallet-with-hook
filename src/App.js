import './App.css';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import { Routes, Route } from "react-router-dom";
import UserProvider from './context/UserProvider';
import WalletProvider from './context/WalletProvider';
function App() {
  return (
    <UserProvider>
      <WalletProvider>
        <Routes>
          <Route path="/" element={<Login />} />          
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </WalletProvider>
    </UserProvider>
  );
}

export default App;
