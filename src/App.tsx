import './App.css'
import ProfileForm from './components/ProfileForm';
import ProfilePage from './pages/ProfilePage';
import Error from './components/Notfound';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
function App() {

  return (
    <>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/profile-form" element={<ProfileForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/404" element={<Error />} />
        <Route path="/" element={<Navigate to="/profile" replace />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
