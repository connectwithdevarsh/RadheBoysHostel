import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { InsertResident } from "@shared/schema";

export default function AddResidentForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<InsertResident>({
    name: "",
    mobile: "",
    roomNumber: "",
    college: "",
    joiningDate: new Date(),
    roomType: "",
    isActive: true
  });

  const addResident = useMutation({
    mutationFn: (data: InsertResident) => 
      apiRequest("POST", "/api/residents", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/residents'] });
      toast({
        title: "Success!",
        description: "Resident added successfully",
      });
      setFormData({
        name: "",
        mobile: "",
        roomNumber: "",
        college: "",
        joiningDate: new Date(),
        roomType: "",
        isActive: true
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add resident",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.roomNumber || !formData.college || !formData.roomType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    addResident.mutate(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Resident</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="mobile">Mobile *</Label>
            <Input
              id="mobile"
              type="tel"
              value={formData.mobile}
              onChange={(e) => setFormData({...formData, mobile: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="roomNumber">Room Number *</Label>
            <Input
              id="roomNumber"
              value={formData.roomNumber}
              onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
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
            <Label htmlFor="joiningDate">Joining Date *</Label>
            <Input
              id="joiningDate"
              type="date"
              value={formData.joiningDate.toISOString().split('T')[0]}
              onChange={(e) => setFormData({...formData, joiningDate: new Date(e.target.value)})}
              required
            />
          </div>
          <div>
            <Label htmlFor="roomType">Room Type *</Label>
            <Select 
              value={formData.roomType} 
              onValueChange={(value) => setFormData({...formData, roomType: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Room Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-sharing">1 Sharing</SelectItem>
                <SelectItem value="2-sharing">2 Sharing</SelectItem>
                <SelectItem value="5-sharing">5 Sharing</SelectItem>
                <SelectItem value="6-sharing">6 Sharing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Button 
              type="submit" 
              className="bg-primary text-white hover:bg-blue-700"
              disabled={addResident.isPending}
            >
              {addResident.isPending ? "Adding..." : "Add Resident"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
