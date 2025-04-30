import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Element } from "./screens/Element";
import { Dashboard } from "./screens/Dashboard";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const defaultDashboardData = {
  name: "User",
  passions: ["Creating meaningful connections", "Exploring new ideas", "Making a difference"],
  personalTraits: ["Empathetic", "Creative", "Determined"],
  paths: [
    { path: "Personal Growth", details: "Continuous learning and development" },
    { path: "Community Impact", details: "Making a positive difference" },
    { path: "Innovation", details: "Finding creative solutions" }
  ],
  dreams: [
    "Building meaningful relationships",
    "Creating lasting impact",
    "Achieving personal goals"
  ],
  reasons: ["Passion for growth", "Desire to help others", "Love for innovation"]
};

function AnimatedRoutes() {
  const location = useLocation();
  const [hasCompletedIntake, setHasCompletedIntake] = useState(false);
  
  useEffect(() => {
    const storedData = localStorage.getItem('userDashboardData');
    if (storedData) {
      setHasCompletedIntake(true);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          hasCompletedIntake ? (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-800 to-blue-700">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-white text-center">
                <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
                <div className="space-y-4">
                  <button
                    onClick={() => window.location.href = '/intake'}
                    className="w-full bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Start New Journey
                  </button>
                  <button
                    onClick={() => window.location.href = '/dashboard'}
                    className="w-full bg-white text-purple-800 px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
                  >
                    View Your Dashboard
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Element />
          )
        } />
        <Route path="/intake" element={<Element />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;