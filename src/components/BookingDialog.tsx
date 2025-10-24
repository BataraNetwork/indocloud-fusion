import { useState } from "react";
import { format, addHours, differenceInHours } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useBookings } from "@/hooks/useBookings";
import { Node } from "@/hooks/useNodes";
import { Calendar, Clock, DollarSign, Loader2 } from "lucide-react";

interface BookingDialogProps {
  node: Node;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BookingDialog({ node, open, onOpenChange }: BookingDialogProps) {
  const { toast } = useToast();
  const { createBooking } = useBookings();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const now = new Date();
  const defaultEnd = addHours(now, 24);

  const [startDate, setStartDate] = useState(format(now, "yyyy-MM-dd'T'HH:mm"));
  const [endDate, setEndDate] = useState(format(defaultEnd, "yyyy-MM-dd'T'HH:mm"));

  const calculateTotal = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const hours = differenceInHours(end, start);
    const price = hours * parseFloat(node.price_per_hour?.toString() || '0');
    return { hours: Math.max(0, hours), price: Math.max(0, price) };
  };

  const { hours, price } = calculateTotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hours <= 0) {
      toast({
        title: "Invalid Duration",
        description: "End date must be after start date",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await createBooking({
        node_id: node.id,
        provider_id: node.provider_wallet,
        start_date: new Date(startDate).toISOString(),
        end_date: new Date(endDate).toISOString(),
        total_hours: hours,
        total_price: price,
        metadata: {
          node_name: node.metadata?.name,
          node_type: node.metadata?.type,
        },
      });

      toast({
        title: "Booking Created",
        description: "Your booking request has been submitted successfully",
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Node</DialogTitle>
          <DialogDescription>
            {node.metadata?.name || 'Unnamed Node'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="start_date">
              <Calendar className="w-4 h-4 inline mr-2" />
              Start Date & Time
            </Label>
            <Input
              id="start_date"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end_date">
              <Calendar className="w-4 h-4 inline mr-2" />
              End Date & Time
            </Label>
            <Input
              id="end_date"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Duration
              </span>
              <span className="font-semibold">{hours} hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Rate
              </span>
              <span className="font-semibold">{node.price_per_hour} BTR/hr</span>
            </div>
            <div className="pt-2 border-t flex items-center justify-between">
              <span className="font-semibold">Total Price</span>
              <span className="text-lg font-bold text-primary">
                {price.toFixed(2)} BTR
              </span>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || hours <= 0}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Booking...
                </>
              ) : (
                'Confirm Booking'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
