import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ token, children }) => {
    if (token) {
        return children
    }
    return <Navigate to="/" replace />
};

export default ProtectedRoute;
