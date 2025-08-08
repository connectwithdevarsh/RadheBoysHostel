import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle, Star, Zap, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const roomRates = [
  { type: "1 Sharing Room (A/C)", price: "₹25,000/month" },
  { type: "2 Sharing Room (A/C)", price: "₹13,000/month" },
  { type: "5 Sharing Room (A/C)", price: "₹7,000/month" },
  { type: "6 Sharing Room (A/C)", price: "₹7,000/month" }
];

export default function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('pricing');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-max section-padding">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No hidden charges, all-inclusive rates with premium facilities included
          </p>
        </div>
        
        <div className={`max-w-6xl mx-auto ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Pricing Card */}
            <Card className="hero-gradient text-white shadow-2xl overflow-hidden">
              <CardContent className="p-10">
                <div className="text-center mb-8">
                  <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold mb-2">Room Rates</h3>
                  <p className="text-blue-200">Starting from ₹7,000/month</p>
                </div>
                <div className="space-y-6">
                  {roomRates.map((rate, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-4 px-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                    >
                      <span className="font-medium">{rate.type}</span>
                      <span className="text-2xl font-bold text-yellow-400">{rate.price}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features Card */}
            <Card className="bg-white shadow-2xl">
              <CardContent className="p-10">
                <div className="text-center mb-8">
                  <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">What's Included</h3>
                  <p className="text-gray-600">All facilities at no extra cost</p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">All Utilities</div>
                      <div className="text-gray-600 text-sm">Electricity, Water, Wi-Fi, Cleaning</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                    <Shield className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">Security Deposit</div>
                      <div className="text-gray-600 text-sm">₹4,000 (100% Refundable on leaving)</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
                    <Star className="w-6 h-6 text-purple-600 mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">Premium Services</div>
                      <div className="text-gray-600 text-sm">24/7 Support, Maintenance, Security</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-primary to-blue-600 text-white shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Book Your Room?</h3>
                <p className="text-blue-100 mb-6">Contact us now to secure your comfortable stay in Ahmedabad</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/918002880087"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white"
                  >
                    <MessageCircle className="mr-2 w-5 h-5" />
                    WhatsApp Now
                  </a>
                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-primary inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-primary"
                  >
                    Book Online
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
