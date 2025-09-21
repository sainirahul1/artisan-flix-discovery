import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Wallet, DollarSign, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "./LoadingSpinner";
import { formatIndianCurrency } from "@/lib/currency";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onSuccess: () => void;
}

export const PaymentModal = ({ isOpen, onClose, total, onSuccess }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    toast({
      title: "Payment Successful!",
      description: `₹${formatIndianCurrency(total)} paid successfully via ${paymentMethod === 'cash' ? 'Cash on Delivery' : paymentMethod === 'wallet' ? 'Digital Wallet' : 'Mock Card'}`,
    });
    
    setTimeout(() => {
      setIsSuccess(false);
      onSuccess();
      onClose();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
            <p className="text-gray-400 text-center">
              Your order has been placed successfully. You will receive a confirmation email shortly.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">₹{formatIndianCurrency(total)}</div>
            <div className="text-sm text-gray-400">Total Amount</div>
          </div>

          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-surface/50 transition-colors">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                <DollarSign className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium">Cash on Delivery</div>
                  <div className="text-sm text-gray-400">Pay when you receive</div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-surface/50 transition-colors">
              <RadioGroupItem value="wallet" id="wallet" />
              <Label htmlFor="wallet" className="flex items-center gap-3 cursor-pointer flex-1">
                <Wallet className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-medium">Digital Wallet</div>
                  <div className="text-sm text-gray-400">UPI, Paytm, etc.</div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-surface/50 transition-colors">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                <CreditCard className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="font-medium">Mock Card Payment</div>
                  <div className="text-sm text-gray-400">For demo purposes</div>
                </div>
              </Label>
            </div>
          </RadioGroup>

          {paymentMethod === "card" && (
            <div className="space-y-4 p-4 bg-surface/30 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="flex gap-4">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
            </div>
          )}

          <Button 
            onClick={handlePayment} 
            disabled={isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Processing...
              </>
            ) : (
              `Pay ₹${formatIndianCurrency(total)}`
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};