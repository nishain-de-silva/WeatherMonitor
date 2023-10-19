import { createBrowserRouter, RouterProvider, Navigate, BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import authProvider from './services/authProvider';
import Dashboard from './pages/dashboard';
import Auth from './pages/auth';
import ProtectedRoute from './pages/dashboard/components/ProtectedRoute';
import { useEffect, useState } from 'react';
import AuthContext from './context/authContext';
import settings from './pages/settings';

const router = createBrowserRouter([{
    path: '/',
    Component: ProtectedRoute,
    children: [
        {
            path: '/',
            element: <Navigate to="/home" />
        },
        {
            path: '/settings',
            Component: settings
        },
        {
            path: '/home',
            Component: Dashboard
        }
    ]
},
{
    path: '/auth',
    Component: Auth
},
{
    path: '*',
    element: <Navigate to="/" />
}
])
export default () => {
    const [user, setUser] = useState({ loading: true })

    useEffect(() => {
        const unsubscriber = authProvider.onAuthStateChanged((user) => {       
            setUser(user)
        })
        return unsubscriber
    }, [])

    return <AuthContext.Provider value={{ user }}>
        <RouterProvider router={router} />
    </AuthContext.Provider>
}