import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Payment, Resident } from "@shared/schema";

type PaymentWithResident = Payment & { resident: Resident };

export default function PaymentTracker() {
  const { toast } = useToast();
  
  const { data: payments, isLoading } = useQuery({
    queryKey: ['/api/payments'],
    queryFn: async () => {
      const response = await fetch('/api/payments', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch payments');
      return response.json() as Promise<PaymentWithResident[]>;
    }
  });

  const updatePaymentStatus = useMutation({
    mutationFn: ({ id, status, paidDate }: { id: number, status: string, paidDate?: Date }) => 
      apiRequest("PUT", `/api/payments/${id}/status`, { status, paidDate }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/payments'] });
      toast({
        title: "Success",
        description: "Payment status updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update payment status",
        variant: "destructive",
      });
    }
  });

  const markAsPaid = (id: number) => {
    updatePaymentStatus.mutate({
      id,
      status: "paid",
      paidDate: new Date()
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading payments...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Resident</th>
                <th className="px-4 py-2 text-left">Room</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Due Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((payment) => (
                <tr key={payment.id} className="border-t">
                  <td className="px-4 py-2">{payment.resident.name}</td>
                  <td className="px-4 py-2">{payment.resident.roomNumber}</td>
                  <td className="px-4 py-2">₹{payment.amount}</td>
                  <td className="px-4 py-2">
                    {new Date(payment.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <Badge 
                      variant={payment.status === "paid" ? "default" : "destructive"}
                      className={
                        payment.status === "paid" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-2">
                    {payment.status !== "paid" && (
                      <Button
                        size="sm"
                        onClick={() => markAsPaid(payment.id)}
                        disabled={updatePaymentStatus.isPending}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Mark as Paid
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!payments || payments.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              No payments found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
