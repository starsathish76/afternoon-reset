import { Routes, Route } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ProtectedRoute } from './components/ProtectedRoute';
import Shop from './Shop';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={
                <ProtectedRoute>
                    <Shop />
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default App;
