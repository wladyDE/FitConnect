import RegisterPage from './pages/login&register/RegisterPage';
import LoginPage from './pages/login&register/LoginPage'
import MapPage from './pages/MapPage'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import SettingsPage from './pages/SettingsPage';
import ChatPage from './pages/chat/ChatPage';
import Groups from './pages/groups/Groups';
import './styles/style.scss';
import 'normalize.css';
import { AppProvider } from './context/AppContext';

function App() {
  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }

    return children;
  }

  return (
    <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute>
                                  <MapPage />
                                </ProtectedRoute>} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="groups" element={<Groups />} />


        </Route>
      </Routes>
    </BrowserRouter>
    </AppProvider>
  );
}

export default App;

