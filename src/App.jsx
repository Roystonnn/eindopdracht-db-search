import { Routes, Route, Navigate } from "react-router-dom";
import Discover from "./pages/Discover/Discover.jsx";
import CharacterDetail from "./pages/CharacterDetail/CharacterDetail.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Discover />} />
      <Route path="/character/:id" element={<CharacterDetail />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
