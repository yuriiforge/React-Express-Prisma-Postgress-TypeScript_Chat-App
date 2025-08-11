import { Route, Routes } from 'react-router-dom';
import Home from './_ui_design/pages/Home';
import Login from './_ui_design/pages/Login';
import SignUp from './_ui_design/pages/SignUp';

function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
