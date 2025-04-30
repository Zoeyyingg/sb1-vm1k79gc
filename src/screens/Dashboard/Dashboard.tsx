import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationArrow } from "../../components/ui/navigation-arrow";

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

const hoverContent = {
  values: {
    title: "Your Core Values",
    description: "These traits define your authentic self and guide your decisions. They're the compass that keeps you true to your path.",
    items: [
      "Empathy allows you to connect deeply with others",
      "Creativity drives your innovative solutions",
      "Determination helps you overcome challenges"
    ]
  },
  dreams: {
    title: "Your Aspirations",
    description: "These dreams represent the future you're building. They're not just goals, but the legacy you wish to create.",
    items: [
      "Your relationships create lasting positive impact",
      "Your impact ripples through communities",
      "Your goals align with your deepest values"
    ]
  },
  strengths: {
    title: "Your Natural Gifts",
    description: "These strengths are your unique advantages. They're the tools you use to overcome challenges and create impact.",
    items: [
      "You excel at building meaningful connections",
      "Your innovative thinking opens new possibilities",
      "Your drive for impact creates positive change"
    ]
  },
  priorities: {
    title: "Your Focus Areas",
    description: "These priorities shape your journey. They're the areas where you choose to invest your energy and time.",
    items: [
      "Personal growth fuels your continuous evolution",
      "Community impact amplifies your contribution",
      "Innovation drives meaningful solutions"
    ]
  }
};

export const Dashboard = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(defaultDashboardData);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('userDashboardData');
    if (storedData) {
      setData(JSON.parse(storedData));
    } else if (location.state) {
      setData(location.state);
      localStorage.setItem('userDashboardData', JSON.stringify(location.state));
    }
  }, [location.state]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.2 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const generateSummary = () => {
    const traits = data.personalTraits?.slice(0, 3).join(", ");
    const passion = data.passions?.[0];
    return `You're someone who seeks patterns in chaos, treasures small victories, and imagines a world more connected and kind. Your path is marked by resilience, wonder, and quiet courage.`;
  };

  const renderHoverContent = (section: string) => {
    const content = hoverContent[section as keyof typeof hoverContent];
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="absolute inset-0 bg-gradient-to-b from-purple-900/95 to-blue-900/95 p-6 flex flex-col justify-between"
      >
        <div>
          <h3 className="text-2xl font-bold mb-2 text-white">{content.title}</h3>
          <p className="text-blue-200 mb-4">{content.description}</p>
        </div>
        <div className="space-y-2">
          {content.items.map((item, index) => (
            <div key={index} className="bg-white/10 rounded-lg px-4 py-2 text-white backdrop-blur-sm">
              {item}
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gradient-to-b from-purple-800 to-blue-700 p-8 text-white relative"
    >
      <div className="absolute top-4 left-4">
        <button 
          onClick={() => navigate('/')}
          className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to your map, {data.name}
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
            <div className="absolute inset-0 bg-white rounded-full opacity-20 blur-md"></div>
            <div className="absolute inset-0 bg-white/30 rounded-full"></div>
            <img 
              src="/potentially.png" 
              alt="Potentially Logo"
              className="absolute inset-0 w-full h-full p-4"
            />
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="absolute top-0 left-0 w-40 h-px bg-white/30 -rotate-45 -translate-x-full -translate-y-24"></div>
              <div className="absolute top-0 right-0 w-40 h-px bg-white/30 rotate-45 translate-x-full -translate-y-24"></div>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="absolute bottom-0 left-0 w-40 h-px bg-white/30 rotate-45 -translate-x-full translate-y-24"></div>
              <div className="absolute bottom-0 right-0 w-40 h-px bg-white/30 -rotate-45 translate-x-full translate-y-24"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-64 gap-y-32 mb-16">
            <motion.div 
              onHoverStart={() => setHoveredSection('values')}
              onHoverEnd={() => setHoveredSection(null)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 relative overflow-hidden"
            >
              <AnimatePresence>
                {hoveredSection === 'values' && renderHoverContent('values')}
              </AnimatePresence>
              <h2 className="text-2xl font-semibold mb-4">Values</h2>
              <div className="space-y-2">
                {data.personalTraits?.map((trait: string, index: number) => (
                  <div key={index} className="bg-white/10 rounded-lg px-4 py-2 hover:bg-white/20 transition-colors">
                    {trait}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              onHoverStart={() => setHoveredSection('dreams')}
              onHoverEnd={() => setHoveredSection(null)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 relative overflow-hidden"
            >
              <AnimatePresence>
                {hoveredSection === 'dreams' && renderHoverContent('dreams')}
              </AnimatePresence>
              <h2 className="text-2xl font-semibold mb-4">Dreams</h2>
              <div className="space-y-2">
                {data.dreams?.map((dream: string, index: number) => (
                  <div key={index} className="bg-white/10 rounded-lg px-4 py-2 hover:bg-white/20 transition-colors">
                    {dream}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              onHoverStart={() => setHoveredSection('strengths')}
              onHoverEnd={() => setHoveredSection(null)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 relative overflow-hidden"
            >
              <AnimatePresence>
                {hoveredSection === 'strengths' && renderHoverContent('strengths')}
              </AnimatePresence>
              <h2 className="text-2xl font-semibold mb-4">Strengths</h2>
              <div className="space-y-2">
                {data.passions?.map((passion: string, index: number) => (
                  <div key={index} className="bg-white/10 rounded-lg px-4 py-2 hover:bg-white/20 transition-colors">
                    {passion}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              onHoverStart={() => setHoveredSection('priorities')}
              onHoverEnd={() => setHoveredSection(null)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 relative overflow-hidden"
            >
              <AnimatePresence>
                {hoveredSection === 'priorities' && renderHoverContent('priorities')}
              </AnimatePresence>
              <h2 className="text-2xl font-semibold mb-4">Priorities</h2>
              <div className="space-y-2">
                {data.paths?.map((path: { path: string, details: string }, index: number) => (
                  <div key={index} className="bg-white/10 rounded-lg px-4 py-2 hover:bg-white/20 transition-colors">
                    <div className="font-medium">{path.path}</div>
                    {path.details && (
                      <div className="text-sm text-blue-200 mt-1">{path.details}</div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={itemVariants}
            className="max-w-4xl mx-auto text-center mb-8"
          >
            <p className="text-2xl text-blue-200">
              {generateSummary()}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};