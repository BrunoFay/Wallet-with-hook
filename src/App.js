import './App.css';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import {Routes,Route} from "react-router-dom";
import Provider from './context/userProvider';
function App() {
  return (
    <Provider>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/wallet" element={<Wallet/>}/>
    </Routes>
    </Provider>
  );
}

export default App;
