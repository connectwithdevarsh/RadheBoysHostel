import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { User, Phone, MapPin, MessageSquare } from "lucide-react";

export default function ContactSection() {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    college: "",
    roomType: "",
    stayDuration: "",
    phone: ""
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('contact');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const submitInquiry = useMutation({
    mutationFn: (data: typeof formData) => 
      apiRequest("POST", "/api/inquiries", data),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Thank you for your inquiry! We will contact you soon.",
      });
      setFormData({
        studentName: "",
        college: "",
        roomType: "",
        stayDuration: "",
        phone: ""
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.college || !formData.roomType || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    submitInquiry.mutate(formData);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="container-max section-padding">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to book your room? Contact us today and secure your comfortable stay in Ahmedabad!
          </p>
        </div>
        
        <div className={`grid lg:grid-cols-2 gap-12 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center mr-4">
                      <User className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Devarsh Mali</p>
                      <p className="text-gray-600">Owner</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center mr-4">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">+91-8002880087</p>
                      <p className="text-gray-600">Call or WhatsApp</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center mr-4 mt-1">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-600">
                        Radhe PG, Vishwas City 1, Chanakyapuri, 
                        Ahmedabad, Gujarat 380061
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button asChild className="w-full bg-accent text-white hover:bg-green-600">
              <a href="https://wa.me/918002880087" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2" size={20} />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
          
          {/* Contact Form */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Inquiry Form
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="studentName">Student Name *</Label>
                  <Input
                    id="studentName"
                    value={formData.studentName}
                    onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="college">College/Company *</Label>
                  <Input
                    id="college"
                    value={formData.college}
                    onChange={(e) => setFormData({...formData, college: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="roomType">Preferred Room Type *</Label>
                  <Select 
                    value={formData.roomType} 
                    onValueChange={(value) => setFormData({...formData, roomType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Room Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-sharing">1 Sharing Room (A/C)</SelectItem>
                      <SelectItem value="2-sharing">2 Sharing Room (A/C)</SelectItem>
                      <SelectItem value="5-sharing">5 Sharing Room (A/C)</SelectItem>
                      <SelectItem value="6-sharing">6 Sharing Room (A/C)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration">Stay Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 6 months, 1 year"
                    value={formData.stayDuration}
                    onChange={(e) => setFormData({...formData, stayDuration: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-white hover:bg-blue-700"
                  disabled={submitInquiry.isPending}
                >
                  {submitInquiry.isPending ? "Sending..." : "Send Inquiry"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
