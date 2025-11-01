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
import { useWeb3 } from "@/hooks/useWeb3";
import { usePayment } from "@/hooks/usePayment";
import { Node } from "@/hooks/useNodes";
import { Calendar, Clock, DollarSign, Loader2, Wallet } from "lucide-react";

interface BookingDialogProps {
  node: Node;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BookingDialog({ node, open, onOpenChange }: BookingDialogProps) {
  const { toast } = useToast();
  const { createBooking } = useBookings();
  const { account, connectWallet, isConnected } = useWeb3();
  const { processNodePayment, isProcessing } = usePayment();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'payment'>('details');

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

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (hours <= 0) {
      toast({
        title: "Invalid Duration",
        description: "End date must be after start date",
        variant: "destructive",
      });
      return;
    }

    setPaymentStep('payment');
  };

  const handlePayment = async () => {
    if (!isConnected) {
      await connectWallet();
      return;
    }

    setIsSubmitting(true);

    // Process blockchain payment
    const paymentResult = await processNodePayment(
      node.id,
      parseFloat(node.price_per_hour?.toString() || '0'),
      hours
    );

    if (paymentResult.success) {
      // Create booking in database after successful payment
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
            transaction_hash: paymentResult.transactionHash
          },
        });

        toast({
          title: "Booking Completed",
          description: "Payment successful and booking confirmed",
        });

        onOpenChange(false);
        setPaymentStep('details');
      } catch (error) {
        toast({
          title: "Warning",
          description: "Payment successful but booking record failed. Please contact support.",
          variant: "destructive",
        });
      }
    }

    setIsSubmitting(false);
  };

  const handleBack = () => {
    setPaymentStep('details');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {paymentStep === 'details' ? 'Book Node' : 'Payment'}
          </DialogTitle>
          <DialogDescription>
            {node.metadata?.name || 'Unnamed Node'}
          </DialogDescription>
        </DialogHeader>

        {paymentStep === 'details' ? (
          <form onSubmit={handleContinueToPayment} className="space-y-4">
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
              >
                Cancel
              </Button>
              <Button type="submit" disabled={hours <= 0}>
                Continue to Payment
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <h3 className="font-semibold">Booking Summary</h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{hours} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rate:</span>
                  <span>{node.price_per_hour} BTR/hr</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-primary">{price.toFixed(2)} BTR</span>
                </div>
              </div>
            </div>

            {!isConnected && (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-sm">
                Connect your wallet to complete the payment
              </div>
            )}

            {isConnected && (
              <div className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Connected Wallet</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  {account?.slice(0, 6)}...{account?.slice(-4)}
                </p>
              </div>
            )}

            <div className="flex gap-2 justify-end">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleBack}
                disabled={isSubmitting || isProcessing}
              >
                Back
              </Button>
              <Button 
                onClick={handlePayment}
                disabled={isSubmitting || isProcessing}
              >
                {isSubmitting || isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isProcessing ? 'Processing...' : 'Confirming...'}
                  </>
                ) : !isConnected ? (
                  'Connect Wallet'
                ) : (
                  'Pay with Crypto'
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
