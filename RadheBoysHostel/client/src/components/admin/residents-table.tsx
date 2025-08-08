import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import type { Resident } from "@shared/schema";

export default function ResidentsTable() {
  const { toast } = useToast();
  
  const { data: residents, isLoading } = useQuery({
    queryKey: ['/api/residents'],
    queryFn: async () => {
      const response = await fetch('/api/residents', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch residents');
      return response.json() as Promise<Resident[]>;
    }
  });

  const deleteResident = useMutation({
    mutationFn: (id: number) => 
      apiRequest("DELETE", `/api/residents/${id}`, undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/residents'] });
      toast({
        title: "Success",
        description: "Resident deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete resident",
        variant: "destructive",
      });
    }
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading residents...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Residents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Mobile</th>
                <th className="px-4 py-2 text-left">Room No</th>
                <th className="px-4 py-2 text-left">College</th>
                <th className="px-4 py-2 text-left">Room Type</th>
                <th className="px-4 py-2 text-left">Joining Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {residents?.map((resident) => (
                <tr key={resident.id} className="border-t">
                  <td className="px-4 py-2">{resident.name}</td>
                  <td className="px-4 py-2">{resident.mobile}</td>
                  <td className="px-4 py-2">{resident.roomNumber}</td>
                  <td className="px-4 py-2">{resident.college}</td>
                  <td className="px-4 py-2">{resident.roomType}</td>
                  <td className="px-4 py-2">
                    {new Date(resident.joiningDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteResident.mutate(resident.id)}
                      disabled={deleteResident.isPending}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!residents || residents.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              No residents found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
