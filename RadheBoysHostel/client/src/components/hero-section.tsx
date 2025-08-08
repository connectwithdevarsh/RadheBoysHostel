import { Button } from "@/components/ui/button";
import { MessageCircle, Home, Shield, Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToRooms = () => {
    const element = document.querySelector("#rooms");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative hero-gradient text-white min-h-screen flex items-center">
      <div className="container-max section-padding w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-200">
                <Home className="w-6 h-6" />
                <span className="font-medium">Welcome to Radhe Boys PG</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Your Perfect
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Home Away
                </span>
                from Home
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                Safe, comfortable, and budget-friendly accommodation for students 
                in the heart of Ahmedabad near RC Technical Institute.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">5+</div>
                <div className="text-sm text-blue-200">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">50+</div>
                <div className="text-sm text-blue-200">Happy Residents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">24/7</div>
                <div className="text-sm text-blue-200">Security</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToRooms}
                size="lg"
                className="btn-primary text-white border-none hover:bg-white hover:text-primary"
              >
                <Home className="mr-2 w-5 h-5" />
                Explore Rooms
              </Button>
              <Button
                onClick={scrollToContact}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <Shield className="mr-2 w-5 h-5" />
                Book Now
              </Button>
            </div>

            {/* WhatsApp CTA */}
            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <MessageCircle className="w-8 h-8 text-green-400" />
              <div className="flex-1">
                <p className="text-sm text-blue-100">Need instant help?</p>
                <p className="font-semibold">Chat with us on WhatsApp</p>
              </div>
              <Button
                asChild
                className="btn-whatsapp text-white"
              >
                <a href="https://wa.me/918002880087" target="_blank" rel="noopener noreferrer">
                  Chat Now
                </a>
              </Button>
            </div>
          </div>

          {/* Right Content - Features Grid */}
          <div className={`space-y-6 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 card-hover">
                <Shield className="w-8 h-8 text-yellow-400 mb-3" />
                <h3 className="font-semibold mb-2">24/7 Security</h3>
                <p className="text-sm text-blue-100">CCTV monitoring and secure access</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 card-hover">
                <Star className="w-8 h-8 text-yellow-400 mb-3" />
                <h3 className="font-semibold mb-2">Premium Facilities</h3>
                <p className="text-sm text-blue-100">AC rooms, Wi-Fi, home-cooked food</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 card-hover">
                <Home className="w-8 h-8 text-yellow-400 mb-3" />
                <h3 className="font-semibold mb-2">Prime Location</h3>
                <p className="text-sm text-blue-100">Near colleges and institutes</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 card-hover">
                <MessageCircle className="w-8 h-8 text-yellow-400 mb-3" />
                <h3 className="font-semibold mb-2">Quick Support</h3>
                <p className="text-sm text-blue-100">Instant response on WhatsApp</p>
              </div>
            </div>

            {/* Pricing Preview */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h3 className="text-xl font-semibold mb-4 text-center">Starting From</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400">₹7,000</div>
                <div className="text-blue-200">per month</div>
                <div className="text-sm text-blue-300 mt-2">All inclusive pricing</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
