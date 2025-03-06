
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  ChefHat, 
  Bike, 
  ShoppingBag, 
  MapPin, 
  Menu, 
  X, 
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Discover', path: '/discover', icon: ShoppingBag },
    { name: 'Become a Chef', path: '/chef-signup', icon: ChefHat },
    { name: 'Deliver with us', path: '/driver-signup', icon: Bike },
  ];

  // Check if we're on a driver page to show delivery dashboard link
  const isDriverPage = location.pathname === '/driver-signup' || location.pathname === '/delivery-dashboard';

  // If we're on a driver page, add the dashboard link
  const currentNavLinks = isDriverPage ? 
    [...navLinks, { name: 'Delivery Dashboard', path: '/delivery-dashboard', icon: MapPin }] : 
    navLinks;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full px-4 md:px-6",
        isScrolled 
          ? "py-3 bg-white/80 backdrop-blur-lg shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-semibold flex items-center space-x-2 text-brand-orange"
          onClick={closeMobileMenu}
        >
          <span className="block h-8 w-8 rounded-full bg-brand-orange text-white flex items-center justify-center">
            KC
          </span>
          <span className={cn(
            "transition-opacity duration-300",
            isScrolled ? "opacity-100" : "opacity-100"
          )}>KitchenConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {currentNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-brand-orange/10 flex items-center space-x-1",
                location.pathname === link.path 
                  ? "text-brand-orange" 
                  : "text-foreground hover:text-brand-orange"
              )}
            >
              <link.icon size={16} />
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="outline" size="sm" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center justify-center h-10 w-10 rounded-full bg-brand-beige"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
        )}

        {/* Mobile Menu */}
        <div className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-4/5 max-w-sm bg-background border-l border-border md:hidden transform transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex flex-col h-full pt-20 pb-6 px-6">
            <button 
              className="absolute top-5 right-5 h-10 w-10 flex items-center justify-center rounded-full bg-brand-beige"
              onClick={closeMobileMenu}
            >
              <X size={20} />
            </button>

            <div className="flex flex-col space-y-4">
              {currentNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 flex items-center space-x-3",
                    location.pathname === link.path 
                      ? "bg-brand-orange/10 text-brand-orange" 
                      : "hover:bg-brand-orange/5 text-foreground hover:text-brand-orange"
                  )}
                  onClick={closeMobileMenu}
                >
                  <link.icon size={20} />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            <div className="mt-auto space-y-3">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/login" onClick={closeMobileMenu}>
                  <User size={18} className="mr-2" />
                  Login
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link to="/signup" onClick={closeMobileMenu}>Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
