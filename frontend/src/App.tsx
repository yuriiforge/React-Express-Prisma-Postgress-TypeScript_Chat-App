import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useAuthContext } from './context/auth.context';

function App() {
  const { authUser, isLoading } = useAuthContext();

  if (isLoading) return null;

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={'/login'} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to={'/'} />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={'/'} />}
        />
      </Routes>
    </div>
  );
}

export default App;
