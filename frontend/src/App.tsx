import { BrowserRouter as Router, Routes,Route, Navigate} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';



function App() {
 
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/login' element={<AdminLoginPage/>}/>
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </Router>
  );
}

export default App
