import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Users, Home, Shield, Award } from "lucide-react";

export default function AboutSection() {
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

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container-max section-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Radhe Boys PG
          </h2>
          <p className="text-xl text-gray-600">Your home away from home</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Modern hostel accommodation"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Welcome to Radhe Boys PG
            </h3>
            <p className="text-gray-600 leading-relaxed">
              At Radhe Boys PG, we understand the importance of a safe, comfortable, 
              and affordable living space for students and working professionals. Located 
              in the prime area of Chanakyapuri, Ahmedabad, we have been providing quality 
              accommodation for boys for several years.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to create a homely environment where residents can focus on 
              their studies and career while enjoying all modern amenities. We prioritize 
              cleanliness, security, and comfort to ensure our residents have the best 
              possible experience.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="text-center p-4 bg-gray-50">
                  <div className="text-2xl font-bold text-primary">5+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center p-4 bg-gray-50">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-gray-600">Happy Residents</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
