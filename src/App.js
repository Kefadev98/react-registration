import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import "./style/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Success from "./components/Success";
import { AuthProvider } from "./context/AuthContext";
import RegisterForm from "./components/RegisterForm";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/success" element={<Success />} />
            </Route>
          </Routes>
        </Router>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
