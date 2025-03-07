import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import { Search, MapPin, Filter, SlidersHorizontal, ChefHat, Star, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Link } from 'react-router-dom';
import DistanceBadge from '../components/ui/DistanceBadge';

// Sample chef data
const sampleChefs = [
  {
    id: "1",
    name: "Maria Rossi",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specialty: "Italian Home Cooking",
    rating: 4.9,
    distance: 1.2,
    dishCount: 15,
    featured: true,
    bio: "Passionate about authentic Italian cuisine passed down through generations."
  },
  {
    id: "2",
    name: "Ahmed Khan",
    image: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specialty: "Middle Eastern Fusion",
    rating: 4.7,
    distance: 2.5,
    dishCount: 12,
    featured: false,
    bio: "Combining traditional Middle Eastern flavors with modern cooking techniques."
  },
  {
    id: "3",
    name: "Sophia Chen",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specialty: "Asian Street Food",
    rating: 4.8,
    distance: 3.1,
    dishCount: 18,
    featured: true,
    bio: "Bringing the vibrant flavors of Asian street markets to your doorstep."
  },
  {
    id: "4",
    name: "Carlos Mendez",
    image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specialty: "Latin American Flavors",
    rating: 4.6,
    distance: 1.8,
    dishCount: 14,
    featured: false,
    bio: "Creating authentic dishes inspired by my grandmother's Latin American recipes."
  },
  {
    id: "5",
    name: "Olivia Green",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specialty: "Vegetarian & Vegan",
    rating: 4.5,
    distance: 0.8,
    dishCount: 20,
    featured: true,
    bio: "Specializing in creative plant-based cuisine that satisfies even the most dedicated meat-lovers."
  },
  {
    id: "6",
    name: "Daniel Lee",
    image: "https://images.unsplash.com/photo-1545987796-200677ee1011?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specialty: "Seafood Specialist",
    rating: 4.7,
    distance: 2.2,
    dishCount: 16,
    featured: false,
    bio: "Fresh seafood dishes inspired by global coastal cuisines."
  },
  {
    id: "7",
    name: "Aisha Farid",
    image: "https://images.unsplash.com/photo-1567336273898-ebbf9eb3c3bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specialty: "Moroccan & Mediterranean",
    rating: 4.8,
    distance: 3.5,
    dishCount: 22,
    featured: true,
    bio: "Sharing the rich spices and traditions of Moroccan and Mediterranean cooking."
  },
  {
    id: "8",
    name: "Suki Thanh",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specialty: "Vietnamese & Thai",
    rating: 4.6,
    distance: 1.7,
    dishCount: 18,
    featured: false,
    bio: "Creating fresh, vibrant Southeast Asian dishes with authentic ingredients and techniques."
  }
];

const specialties = [
  "All",
  "Italian",
  "Middle Eastern",
  "Asian",
  "Latin American",
  "Vegetarian & Vegan",
  "Seafood",
  "Moroccan & Mediterranean",
  "Vietnamese & Thai"
];

const ChefCard = ({ chef }: { chef: typeof sampleChefs[0] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative">
        <img 
          src={chef.image} 
          alt={chef.name} 
          className="w-full h-52 object-cover object-center"
        />
        {chef.featured && (
          <div className="absolute top-3 right-3 bg-brand-orange text-white text-xs font-medium px-2 py-1 rounded-full">
            Featured Chef
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-xl">{chef.name}</h3>
          <DistanceBadge distance={chef.distance} />
        </div>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <ChefHat size={16} className="mr-1.5" />
          <span className="text-sm">{chef.specialty}</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{chef.bio}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Star size={16} fill="#FFC107" className="text-yellow-500 mr-1" />
            <span className="font-medium">{chef.rating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-muted-foreground">{chef.dishCount} dishes available</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full" asChild>
            <Link to={`/chef/${chef.id}`}>View Profile</Link>
          </Button>
          <Button className="w-full" asChild>
            <Link to={`/chef/${chef.id}/menu`}>View Menu</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const Chefs = () => {
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxDistance, setMaxDistance] = useState(5);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Filter chefs by specialty and search query
  const filteredChefs = sampleChefs
    .filter(chef => {
      // Filter by specialty
      if (activeSpecialty !== "All" && chef.specialty !== activeSpecialty) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery && !chef.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by distance
      if (chef.distance > maxDistance) {
        return false;
      }
      
      return true;
    })
    // Sort by distance
    .sort((a, b) => a.distance - b.distance);

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Discover Home Chefs Near You</h1>
            <p className="text-muted-foreground">
              Connect with talented home chefs in your neighborhood
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-border p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  type="text" 
                  placeholder="Search chefs..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                    onClick={() => setSearchQuery("")}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              <div className="flex gap-4">
                <div className="relative w-full md:w-48">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Select>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Your location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current location</SelectItem>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="custom">Add new location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={toggleFilters}
                >
                  <SlidersHorizontal size={18} />
                  <span className="hidden md:inline">Filters</span>
                </Button>
              </div>
            </div>
            
            {/* Filter panel */}
            {filtersOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-border"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Distance slider */}
                  <div>
                    <Label className="mb-2 block">Maximum Distance</Label>
                    <div className="px-2">
                      <Slider
                        value={[maxDistance]}
                        min={0.5}
                        max={10}
                        step={0.5}
                        onValueChange={(values) => setMaxDistance(values[0])}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>0.5 km</span>
                      <span>{maxDistance} km</span>
                      <span>10 km</span>
                    </div>
                  </div>
                  
                  {/* Other filters */}
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Rating</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Any rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any rating</SelectItem>
                          <SelectItem value="4.5">4.5+ stars</SelectItem>
                          <SelectItem value="4">4+ stars</SelectItem>
                          <SelectItem value="3.5">3.5+ stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="available-now">Available now</Label>
                      <Switch id="available-now" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="featured-only">Featured chefs only</Label>
                      <Switch id="featured-only" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => {
                    setMaxDistance(5);
                    // Reset other filters
                  }}>
                    Reset Filters
                  </Button>
                  <Button onClick={toggleFilters}>
                    Apply Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Specialties */}
          <div className="mb-8 overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 pb-2">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    activeSpecialty === specialty 
                      ? "bg-brand-orange text-white" 
                      : "bg-white text-foreground hover:bg-gray-100 border border-border"
                  }`}
                  onClick={() => setActiveSpecialty(specialty)}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
          
          {/* Results count */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredChefs.length}</span> chefs
              {activeSpecialty !== "All" && ` specializing in "${activeSpecialty}"`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
            
            <div className="flex items-center">
              <span className="mr-2 text-sm text-muted-foreground">Sort by:</span>
              <Select defaultValue="distance">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Nearest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="dishes">Most Dishes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Chefs grid */}
          {filteredChefs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredChefs.map((chef) => (
                <ChefCard key={chef.id} chef={chef} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-border p-8 text-center">
              <div className="mb-4">
                <Filter className="w-12 h-12 mx-auto text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No chefs found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search criteria
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setActiveSpecialty("All");
                  setSearchQuery("");
                  setMaxDistance(5);
                }}
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Chefs;
