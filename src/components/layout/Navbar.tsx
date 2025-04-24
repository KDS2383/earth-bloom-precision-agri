import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, X, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.svg';
import { auth } from '../../firebase'; // Firebase auth import
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Firebase auth functions

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null); // Use state for user
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user state based on auth state
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Conditionally add the "Recommendation" link if user is logged in
  const navLinks = [
    { name: 'Home', path: '/' },
    user ? { name: 'Recommendation', path: '/recommendation' } : null, // Add "Recommendation" only if user is logged in
    { name: 'Soil Data', path: '/soil-data' },
    { name: 'Weather', path: '/weather' },
    { name: 'Contact Us', path: '/contact' },
  ].filter(Boolean); // Remove any null values from the array

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to home after signing out
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="EarthBloom Logo" className="h-8 w-auto" />
            <span className="hidden font-sans text-xl font-bold text-farm-primary sm:inline-block">
              EarthBloom
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'nav-link',
                isActive(link.path) && 'nav-link-active'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || 'https://via.placeholder.com/100'} alt={user.displayName} />
                    <AvatarFallback className="bg-farm-secondary text-white">
                      {user.displayName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || 'https://via.placeholder.com/100'} alt={user.displayName} />
                    <AvatarFallback className="bg-farm-secondary text-black">
                      {user.displayName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-0.5 leading-none">
                    <p className="font-medium text-sm text-black">{user.displayName}</p>
                    <p className="text-xs text-muted-foreground">Farmer</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer flex w-full items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button className="bg-farm-primary hover:bg-farm-dark" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'py-2 px-3 rounded-md transition-colors',
                  isActive(link.path)
                    ? 'bg-farm-primary/10 text-farm-primary font-medium'
                    : 'hover:bg-muted'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!user && (
              <div className="pt-2 flex flex-col space-y-2">
                <Button variant="outline" asChild>
                  <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button className="bg-farm-primary hover:bg-farm-dark" asChild>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
