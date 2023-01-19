import { AuthProvider } from "./app/Navigation/AuthContext";
import AppNav from "./app/Navigation/AppNav";

function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

export default App;
