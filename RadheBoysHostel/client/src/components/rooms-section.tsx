import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { 
  Bed, 
  Utensils, 
  Wifi, 
  Video, 
  Brush, 
  Droplets, 
  ShirtIcon 
} from "lucide-react";

const roomTypes = [
  {
    title: "1 Sharing Room (A/C)",
    description: "Private room with air conditioning",
    price: "₹25,000",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    title: "2 Sharing Room (A/C)",
    description: "Shared room with air conditioning",
    price: "₹13,000",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    title: "5 Sharing Room (A/C)",
    description: "Dormitory style with A/C",
    price: "₹7,000",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    title: "6 Sharing Room (A/C)",
    description: "Budget-friendly shared room",
    price: "₹7,000",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  }
];

const facilities = [
  { icon: Bed, label: "Bed & Locker" },
  { icon: Utensils, label: "Home-cooked Food" },
  { icon: Wifi, label: "High-speed Wi-Fi" },
  { icon: Video, label: "CCTV Security" },
  { icon: Brush, label: "Daily Cleaning" },
  { icon: Droplets, label: "Drinking Water" },
  { icon: ShirtIcon, label: "Washing Machine" }
];

export default function RoomsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('rooms');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="rooms" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-max section-padding">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Rooms & Facilities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comfortable, fully-equipped room options designed for your convenience and comfort
          </p>
        </div>
        
        {/* Room Options */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
          {roomTypes.map((room, index) => (
            <Card key={index} className="bg-white card-hover group overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {room.title}
                </h3>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-bold text-primary">{room.price}</span>
                    <span className="text-sm font-normal text-gray-500 ml-1">/month</span>
                  </div>
                  <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                    All Inclusive
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Facilities */}
        <Card className={`bg-gradient-to-br from-white to-blue-50 shadow-xl border-blue-100 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <CardContent className="p-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Premium Facilities
              </h3>
              <p className="text-lg text-gray-600">
                Everything you need for a comfortable stay
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
              {facilities.map((facility, index) => (
                <div key={index} className="text-center group">
                  <div className="facility-icon w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <facility.icon className="text-primary" size={28} />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors">
                    {facility.label}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
