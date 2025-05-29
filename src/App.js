import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Cloudkids from './Pages/Cloudkids';
import About from './Pages/about';

function App() {
  return (
    <Router>
      <Header />
       <main className="py-3 background0">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cloudkids" element={<Cloudkids />} />
        </Routes>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
