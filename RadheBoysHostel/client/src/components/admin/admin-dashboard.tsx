import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ResidentsTable from "./residents-table";
import AddResidentForm from "./add-resident-form";
import PaymentTracker from "./payment-tracker";
import RoomStatus from "./room-status";
import InquiriesList from "./inquiries-list";
import { LogOut } from "lucide-react";

interface AdminDashboardProps {
  onLogout: () => void;
}

type AdminSection = "residents" | "add-resident" | "payments" | "rooms" | "inquiries";

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>("residents");

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    onLogout();
  };

  const navItems = [
    { id: "residents" as AdminSection, label: "View Residents" },
    { id: "add-resident" as AdminSection, label: "Add Resident" },
    { id: "payments" as AdminSection, label: "Payment Tracker" },
    { id: "rooms" as AdminSection, label: "Room Status" },
    { id: "inquiries" as AdminSection, label: "Inquiries" }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "residents":
        return <ResidentsTable />;
      case "add-resident":
        return <AddResidentForm />;
      case "payments":
        return <PaymentTracker />;
      case "rooms":
        return <RoomStatus />;
      case "inquiries":
        return <InquiriesList />;
      default:
        return <ResidentsTable />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold text-gray-900">
              Radhe PG Admin Dashboard
            </h1>
            <Button 
              onClick={handleLogout}
              variant="destructive"
              className="bg-red-500 hover:bg-red-600"
            >
              <LogOut className="mr-2" size={16} />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  variant={activeSection === item.id ? "default" : "outline"}
                  className={
                    activeSection === item.id 
                      ? "bg-primary text-white" 
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
}
