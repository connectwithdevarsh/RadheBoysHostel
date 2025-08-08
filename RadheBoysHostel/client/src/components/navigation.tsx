import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Home } from "lucide-react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#rooms", label: "Rooms" },
    { href: "#pricing", label: "Pricing" },
    { href: "#location", label: "Location" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-white/90 backdrop-blur-sm shadow-sm'
    }`}>
      <div className="container-max">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-primary p-2 rounded-lg">
              <Home className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Radhe Boys PG</h1>
              <p className="text-xs text-gray-500">Your Home in Ahmedabad</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-primary font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <Link href="/admin">
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 text-sm font-medium">
                Admin
              </button>
            </Link>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ${
        mobileMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-white/95 backdrop-blur-md border-t px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="block py-3 text-gray-700 hover:text-primary w-full text-left font-medium hover:bg-gray-50 rounded-lg px-3 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <Link href="/admin">
            <button className="block py-3 text-primary hover:bg-primary/10 w-full text-left font-medium rounded-lg px-3 transition-colors">
              Admin Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
