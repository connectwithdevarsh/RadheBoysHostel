import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Phone, MessageSquare } from "lucide-react";
import type { Inquiry } from "@shared/schema";

export default function InquiriesList() {
  const { toast } = useToast();
  
  const { data: inquiries, isLoading } = useQuery({
    queryKey: ['/api/inquiries'],
    queryFn: async () => {
      const response = await fetch('/api/inquiries', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch inquiries');
      return response.json() as Promise<Inquiry[]>;
    }
  });

  const markAsHandled = useMutation({
    mutationFn: (id: number) => 
      apiRequest("PUT", `/api/inquiries/${id}/handled`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/inquiries'] });
      toast({
        title: "Success",
        description: "Inquiry marked as handled",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update inquiry",
        variant: "destructive",
      });
    }
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading inquiries...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Inquiries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inquiries?.map((inquiry) => (
            <div key={inquiry.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{inquiry.studentName}</h3>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={inquiry.isHandled ? "default" : "secondary"}
                    className={
                      inquiry.isHandled 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {inquiry.isHandled ? "Handled" : "New"}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {new Date(inquiry.createdAt!).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                <p><strong>College:</strong> {inquiry.college}</p>
                <p><strong>Room Type:</strong> {inquiry.roomType}</p>
                <p><strong>Phone:</strong> {inquiry.phone}</p>
                {inquiry.stayDuration && (
                  <p><strong>Duration:</strong> {inquiry.stayDuration}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                >
                  <a href={`tel:${inquiry.phone}`}>
                    <Phone size={16} className="mr-1" />
                    Call
                  </a>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                >
                  <a 
                    href={`https://wa.me/91${inquiry.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare size={16} className="mr-1" />
                    WhatsApp
                  </a>
                </Button>
                {!inquiry.isHandled && (
                  <Button
                    size="sm"
                    onClick={() => markAsHandled.mutate(inquiry.id)}
                    disabled={markAsHandled.isPending}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Mark as Handled
                  </Button>
                )}
              </div>
            </div>
          ))}
          {(!inquiries || inquiries.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              No inquiries found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
