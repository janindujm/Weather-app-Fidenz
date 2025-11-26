import WeatherApp from "./Components/WeatherApp";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
    const { logout } = useAuth0();

    return (
        <ProtectedRoute>
            <WeatherApp logout={logout} />
        </ProtectedRoute>
    );
}

export default App;
