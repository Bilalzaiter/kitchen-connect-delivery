import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import DishCard from '../components/ui/DishCard';
import { Search, ChevronDown, X, MapPin, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Sample dish data
const sampleDishes = [
  {
    id: "1",
    name: "Homemade Lasagna",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1ec6461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    chef: {
      name: "Maria Rossi",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    price: 14.99,
    rating: 4.8,
    distance: 1.2,
    prepTime: 35,
    category: "Italian"
  },
  {
    id: "2",
    name: "Chicken Biryani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    chef: {
      name: "Ahmed Khan",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    price: 12.99,
    rating: 4.7,
    distance: 2.5,
    prepTime: 40,
    category: "Indian"
  },
  {
    id: "3",
    name: "Dim Sum Platter",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    chef: {
      name: "Sophia Chen",
      avatar: "https://randomuser.me/api/portraits/women/72.jpg"
    },
    price: 18.50,
    rating: 4.9,
    distance: 3.1,
    prepTime: 30,
    category: "Chinese"
  },
  {
    id: "4",
    name: "Beef Enchiladas",
    image: "https://images.unsplash.com/photo-1619096252214-ef06c45683e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    chef: {
      name: "Carlos Mendez",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    price: 13.75,
    rating: 4.6,
    distance: 1.8,
    prepTime: 25,
    category: "Mexican"
  },
  {
    id: "5",
    name: "Vegan Buddha Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    chef: {
      name: "Olivia Green",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    price: 11.50,
    rating: 4.5,
    distance: 0.8,
    prepTime: 20,
    category: "Vegan"
  },
  {
    id: "6",
    name: "Grilled Salmon",
    image: "https://images.unsplash.com/photo-1506434804176-585e91a67aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    chef: {
      name: "Daniel Lee",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg"
    },
    price: 16.99,
    rating: 4.7,
    distance: 2.2,
    prepTime: 30,
    category: "Seafood"
  },
  {
    id: "7",
    name: "Lamb Tagine",
    image: "https://images.unsplash.com/photo-1547117731-af9abeba11b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    chef: {
      name: "Aisha Farid",
      avatar: "https://randomuser.me/api/portraits/women/58.jpg"
    },
    price: 15.50,
    rating: 4.8,
    distance: 3.5,
    prepTime: 45,
    category: "Middle Eastern"
  },
  {
    id: "8",
    name: "Pad Thai",
    image: "https://images.unsplash.com/photo-1503200955531-7a658a716fb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    chef: {
      name: "Suki Thanh",
      avatar: "https://randomuser.me/api/portraits/women/64.jpg"
    },
    price: 12.75,
    rating: 4.6,
    distance: 1.7,
    prepTime: 25,
    category: "Thai"
  }
];

// Categories
const categories = [
  "All",
  "Italian",
  "Indian",
  "Chinese",
  "Mexican",
  "Vegan",
  "Seafood",
  "Middle Eastern",
  "Thai"
];

const Discover = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxDistance, setMaxDistance] = useState(5);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Filter dishes by category and search query
  const filteredDishes = sampleDishes
    .filter(dish => {
      // Filter by category
      if (activeCategory !== "All" && dish.category !== activeCategory) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery && !dish.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by distance
      if (dish.distance > maxDistance) {
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
            <h1 className="text-3xl font-bold mb-2">Discover Dishes Near You</h1>
            <p className="text-muted-foreground">
              Explore homemade meals from talented chefs in your neighborhood
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-border p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  type="text" 
                  placeholder="Search dishes..." 
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  
                  {/* Dietary preferences */}
                  <div>
                    <Label className="mb-3 block">Dietary Preferences</Label>
                    <div className="space-y-2">
                      {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"].map((pref) => (
                        <div key={pref} className="flex items-center space-x-2">
                          <Checkbox id={`pref-${pref}`} />
                          <Label htmlFor={`pref-${pref}`} className="text-sm font-normal">
                            {pref}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Other filters */}
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Price Range</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Any price" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any price</SelectItem>
                          <SelectItem value="budget">Budget-friendly</SelectItem>
                          <SelectItem value="mid">Mid-range</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="avail-now">Available now</Label>
                      <Switch id="avail-now" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="free-delivery">Free delivery</Label>
                      <Switch id="free-delivery" />
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
          
          {/* Categories */}
          <div className="mb-8 overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    activeCategory === category 
                      ? "bg-brand-orange text-white" 
                      : "bg-white text-foreground hover:bg-gray-100 border border-border"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Results count */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredDishes.length}</span> results
              {activeCategory !== "All" && ` for "${activeCategory}"`}
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
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Dishes grid */}
          {filteredDishes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredDishes.map((dish, index) => (
                <DishCard key={dish.id} {...dish} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-border p-8 text-center">
              <div className="mb-4">
                <Filter className="w-12 h-12 mx-auto text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No dishes found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search criteria
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setActiveCategory("All");
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

export default Discover;
