import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Contact from '../pages/Contact'
import Dashboard from '../pages/Dashboard'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import PrivateRoute from './PrivateRoute'
import Settings from '../pages/Settings'


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            >
                <Route path="settings" element={<Settings />} />
                {/* <Route index element={<DashboardHome />} />
                <Route path="apps" element={<DashboardApps />} />
                <Route path="chart" element={<DashboardChart />} />
                <Route path="chat" element={<DashboardChat />} />
                <Route path="settings" element={<DashboardSettings />} />
                <Route path="help" element={<DashboardHelp />} /> */}
            </Route>
        </Routes>
    )
}
