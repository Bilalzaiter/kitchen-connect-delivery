import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { useToast } from "@/hooks/use-toast"

const DeliveryDashboard = () => {
  const { toast } = useToast()
  const [orders, setOrders] = useState([
    {
      id: '1',
      customerName: 'John Doe',
      deliveryAddress: '123 Main St',
      orderDate: '2024-03-15',
      status: 'Pending',
      items: [{ name: 'Burger', quantity: 2 }, { name: 'Fries', quantity: 1 }],
      notes: 'Extra napkins please',
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      deliveryAddress: '456 Elm St',
      orderDate: '2024-03-16',
      status: 'Delivered',
      items: [{ name: 'Pizza', quantity: 1 }, { name: 'Salad', quantity: 1 }],
      notes: 'Ring the doorbell',
    },
    {
      id: '3',
      customerName: 'Alice Johnson',
      deliveryAddress: '789 Oak St',
      orderDate: '2024-03-17',
      status: 'Out for Delivery',
      items: [{ name: 'Sushi', quantity: 3 }, { name: 'Miso Soup', quantity: 2 }],
      notes: 'Leave at the front door',
    },
    {
      id: '4',
      customerName: 'Bob Williams',
      deliveryAddress: '101 Pine St',
      orderDate: '2024-03-18',
      status: 'Cancelled',
      items: [{ name: 'Tacos', quantity: 2 }, { name: 'Guacamole', quantity: 1 }],
      notes: 'Customer cancelled order',
    },
    {
      id: '5',
      customerName: 'Charlie Brown',
      deliveryAddress: '222 Cedar St',
      orderDate: '2024-03-19',
      status: 'Pending',
      items: [{ name: 'Pasta', quantity: 1 }, { name: 'Breadsticks', quantity: 2 }],
      notes: 'Call when you arrive',
    },
    {
      id: '6',
      customerName: 'Diana Miller',
      deliveryAddress: '333 Birch St',
      orderDate: '2024-03-20',
      status: 'Delivered',
      items: [{ name: 'Steak', quantity: 1 }, { name: 'Mashed Potatoes', quantity: 1 }],
      notes: 'Side entrance is open',
    },
    {
      id: '7',
      customerName: 'Ethan Davis',
      deliveryAddress: '444 Maple St',
      orderDate: '2024-03-21',
      status: 'Out for Delivery',
      items: [{ name: 'Ramen', quantity: 2 }, { name: 'Gyoza', quantity: 1 }],
      notes: 'Apartment buzzer code is 1234',
    },
    {
      id: '8',
      customerName: 'Fiona Wilson',
      deliveryAddress: '555 Walnut St',
      orderDate: '2024-03-22',
      status: 'Cancelled',
      items: [{ name: 'Sandwich', quantity: 1 }, { name: 'Chips', quantity: 1 }],
      notes: 'Customer changed mind',
    },
    {
      id: '9',
      customerName: 'George Garcia',
      deliveryAddress: '666 Cherry St',
      orderDate: '2024-03-23',
      status: 'Pending',
      items: [{ name: 'Curry', quantity: 1 }, { name: 'Rice', quantity: 1 }],
      notes: 'Spicy please',
    },
    {
      id: '10',
      customerName: 'Hannah Rodriguez',
      deliveryAddress: '777 Oak St',
      orderDate: '2024-03-24',
      status: 'Delivered',
      items: [{ name: 'Soup', quantity: 1 }, { name: 'Salad', quantity: 1 }],
      notes: 'Leave on porch',
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editNotes, setEditNotes] = useState('');

  useEffect(() => {
    // Simulate fetching orders from an API
    // In a real application, you would fetch data from your backend here
    // and update the orders state with the fetched data.
  }, []);

  const filteredOrders = orders.filter(order => {
    const searchMatch =
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.deliveryAddress.toLowerCase().includes(searchQuery.toLowerCase());

    const dateMatch = dateRange?.from
      ? new Date(order.orderDate) >= dateRange.from &&
        new Date(order.orderDate) <= (dateRange.to || new Date())
      : true;

    const statusMatch = selectedStatus ? order.status === selectedStatus : true;

    return searchMatch && dateMatch && statusMatch;
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast({
      title: "Status Updated!",
      description: `Order ${orderId} status updated to ${newStatus}.`,
    })
  };

  const handleOpenDialog = (order: any) => {
    setSelectedOrder(order);
    setEditNotes(order.notes || '');
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSaveNotes = () => {
    if (selectedOrder) {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === selectedOrder.id ? { ...order, notes: editNotes } : order
        )
      );
      setSelectedOrder(prevState => ({ ...prevState, notes: editNotes }));
      toast({
        title: "Notes Updated!",
        description: `Notes for order ${selectedOrder.id} updated successfully.`,
      })
    }
    handleCloseDialog();
  };

  const handleViewDetailsClick = (orderId: string) => {
    console.log(`Viewing details for order ${orderId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Delivery Dashboard</h1>

      {/* Filters */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-4">
        <Input
          type="text"
          placeholder="Search by customer or address..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !dateRange?.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  `${format(dateRange.from, "LLL dd, y")} - ${format(
                    dateRange.to,
                    "LLL dd, y"
                  )}`
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              pagedNavigation
            />
          </PopoverContent>
        </Popover>

        <select
          className="border rounded p-2"
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Order Table */}
      <Table>
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map(order => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.deliveryAddress}</TableCell>
              <TableCell>{order.orderDate}</TableCell>
              <TableCell>
                <Badge>{order.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleOpenDialog(order)}>
                    View Details
                  </Button>
                  <select
                    className="border rounded p-1"
                    value={order.status}
                    onChange={e => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              View and manage the details for this order.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Customer Name</Label>
                    <Card>
                      <CardContent>{selectedOrder.customerName}</CardContent>
                    </Card>
                  </div>
                  <div>
                    <Label>Delivery Address</Label>
                    <Card>
                      <CardContent>{selectedOrder.deliveryAddress}</CardContent>
                    </Card>
                  </div>
                  <div>
                    <Label>Order Date</Label>
                    <Card>
                      <CardContent>{selectedOrder.orderDate}</CardContent>
                    </Card>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Card>
                      <CardContent>
                        <Badge>{selectedOrder.status}</Badge>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <Label>Items</Label>
                  <Card>
                    <CardContent>
                      <ul>
                        {selectedOrder.items.map((item, index) => (
                          <li key={index} className="flex justify-between">
                            <span>{item.name}</span>
                            <span>x{item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Order notes..."
                    value={editNotes}
                    onChange={e => setEditNotes(e.target.value)}
                    className="resize-none"
                  />
                </div>
              </div>
            </ScrollArea>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="secondary" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveNotes}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeliveryDashboard;
