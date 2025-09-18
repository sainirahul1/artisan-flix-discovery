import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { PaymentModal } from "@/components/PaymentModal";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleCheckout = () => {
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    clearCart();
    navigate("/");
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase. Your items will be delivered soon.",
    });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 px-6">
          <div className="max-w-4xl mx-auto text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">Your Cart is Empty</h1>
            <p className="text-gray-400 text-lg mb-8">
              Discover amazing handcrafted items from local artisans
            </p>
            <Button variant="hero" size="xl" onClick={() => navigate("/")}>
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
            <Button variant="outline" onClick={clearCart}>
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="glass rounded-2xl p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-semibold mb-1">
                        {item.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">by {item.artisan}</p>
                      <p className="text-accent text-lg font-bold">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <Button
                        variant="glass"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="glass"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-white w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="glass"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="glass rounded-2xl p-6 h-fit">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Items ({state.totalItems})</span>
                  <span>₹{state.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-600 pt-3">
                  <div className="flex justify-between text-white text-lg font-bold">
                    <span>Total</span>
                    <span>₹{state.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                <Button 
                  variant="glass" 
                  size="lg" 
                  className="w-full"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        total={state.totalPrice}
        onSuccess={handlePaymentSuccess}
      />
      
      <div className="h-32" />
    </div>
  );
};

export default Cart;