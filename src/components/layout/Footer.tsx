
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.svg';

export function Footer() {
  return (
    <footer className="bg-farm-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="EarthBloom Logo" className="h-8 w-auto" />
              <span className="font-sans text-xl font-bold">EarthBloom</span>
            </Link>
            <p className="text-sm text-gray-300 mb-4">
              Advanced AI-powered solutions for precision farming and optimized land management.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/recommendation" className="text-gray-300 hover:text-white transition-colors">Recommendation</Link></li>
              <li><Link to="/soil-data" className="text-gray-300 hover:text-white transition-colors">Soil Data</Link></li>
              <li><Link to="/weather" className="text-gray-300 hover:text-white transition-colors">Weather</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Crop Database</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Farming Guides</a></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-sm text-gray-300 mb-2">Subscribe for farming tips and updates</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md bg-farm-primary/50 text-white placeholder:text-gray-300 border border-farm-secondary/30 focus:outline-none focus:ring-2 focus:ring-farm-accent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-farm-accent text-farm-dark font-medium rounded-md hover:bg-farm-accent/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-farm-primary/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} EarthBloom. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
