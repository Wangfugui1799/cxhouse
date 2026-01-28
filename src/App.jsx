import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RoomDetail from './pages/RoomDetail'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'

function App() {
    return (
        <Router>
            <Routes>
                {/* 前端展示页面 */}
                <Route path="/" element={<Home />} />
                <Route path="/room" element={<RoomDetail />} />
                <Route path="/contact" element={<Contact />} />

                {/* 后台管理页面 */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
        </Router>
    )
}

export default App
