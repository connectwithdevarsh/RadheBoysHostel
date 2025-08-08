import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, GraduationCap, ExternalLink, Navigation, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function LocationSection() {
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

    const section = document.getElementById('location');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="location" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-max section-padding">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Prime Location
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Strategically located in Chanakyapuri, near major colleges and institutes for your convenience
          </p>
        </div>
        
        <div className={`grid lg:grid-cols-2 gap-12 items-start ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
          <div className="space-y-8">
            <Card className="bg-white shadow-xl card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-primary p-3 rounded-xl mr-4">
                    <MapPin className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Address</h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Radhe Boys PG, Near Silver Oak and RC Technical Institute<br />
                  Vishwas City 1, Chanakyapuri<br />
                  Ahmedabad – 380061, Gujarat
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-xl card-hover">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-green-500 p-3 rounded-xl mr-4">
                    <GraduationCap className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Nearby Institutes</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-green-600 mr-3" />
                      <span className="font-semibold text-gray-900">RC Technical Institute</span>
                    </div>
                    <span className="text-green-600 font-bold">800m</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center">
                      <Navigation className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="font-semibold text-gray-900">Silver Oak University</span>
                    </div>
                    <span className="text-blue-600 font-bold">Nearby</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                    <div className="flex items-center">
                      <GraduationCap className="w-5 h-5 text-purple-600 mr-3" />
                      <span className="font-semibold text-gray-900">Other Colleges</span>
                    </div>
                    <span className="text-purple-600 font-bold">Close</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button asChild className="w-full btn-primary text-white">
              <a
                href="https://maps.app.goo.gl/z1KPt35Fzs9VYszA7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2" size={16} />
                Open in Google Maps
              </a>
            </Button>
          </div>
          
          <Card className="bg-white shadow-xl overflow-hidden card-hover">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.7272!2d72.5216!3d23.0225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzIxLjAiTiA3MsKwMzEnMTcuOCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[500px]"
            />
          </Card>
        </div>
      </div>
    </section>
  );
}
