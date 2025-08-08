import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { RoomStatus } from "@shared/schema";

export default function RoomStatus() {
  const { data: roomStatus, isLoading } = useQuery({
    queryKey: ['/api/room-status'],
    queryFn: async () => {
      const response = await fetch('/api/room-status', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch room status');
      return response.json() as Promise<RoomStatus[]>;
    }
  });

  // Default room status if no data
  const defaultRoomStatus = [
    { roomType: "1 Sharing Rooms", totalRooms: 5, occupiedRooms: 3 },
    { roomType: "2 Sharing Rooms", totalRooms: 5, occupiedRooms: 4 },
    { roomType: "5 Sharing Rooms", totalRooms: 2, occupiedRooms: 2 },
    { roomType: "6 Sharing Rooms", totalRooms: 4, occupiedRooms: 1 }
  ];

  const displayData = roomStatus && roomStatus.length > 0 ? roomStatus : defaultRoomStatus;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading room status...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Availability Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayData.map((room, index) => {
            const available = room.totalRooms - room.occupiedRooms;
            const isFullyOccupied = available === 0;
            const isLowAvailability = available <= 1 && !isFullyOccupied;
            
            return (
              <div 
                key={index} 
                className={`border rounded-lg p-4 ${
                  isFullyOccupied 
                    ? 'bg-red-50 border-red-200' 
                    : isLowAvailability 
                      ? 'bg-yellow-50 border-yellow-200' 
                      : 'bg-green-50 border-green-200'
                }`}
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {room.roomType}
                </h3>
                <p className="text-sm text-gray-600">
                  Available: {available} | Occupied: {room.occupiedRooms}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Total Rooms: {room.totalRooms}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
