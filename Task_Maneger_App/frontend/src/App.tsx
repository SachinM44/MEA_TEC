import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import PrivateRoute from './components/PrivateRoute';
import { logout } from './slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="p-4 bg-white shadow-md">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <h1 className="text-xl font-bold">Task Manager</h1>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="text-blue-600 hover:underline">
                Logout
              </button>
            ) : (
              <>
                <a href="/login" className="text-blue-600 hover:underline">Login</a>
                <a href="/register" className="text-blue-600 hover:underline">Register</a>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="max-w-4xl p-4 mx-auto">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks" element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            } />
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;