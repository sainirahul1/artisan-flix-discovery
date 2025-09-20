import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, Users, TrendingUp, Shield, Zap, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface JoinSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinSellerModal = ({ isOpen, onClose }: JoinSellerModalProps) => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Users className="h-6 w-6 text-blue-400" />,
      title: "Global Reach",
      description: "Connect with customers worldwide"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-green-400" />,
      title: "Zero Fees to Start",
      description: "List your first 10 items for free"
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-400" />,
      title: "Secure Payments",
      description: "Fast, secure payment processing"
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-400" />,
      title: "Easy Setup",
      description: "Go live in under 10 minutes"
    },
    {
      icon: <Globe className="h-6 w-6 text-cyan-400" />,
      title: "Marketing Support",
      description: "We help promote your crafts"
    },
    {
      icon: <Star className="h-6 w-6 text-orange-400" />,
      title: "Premium Features",
      description: "Advanced analytics & insights"
    }
  ];

  const handleJoinSeller = () => {
    onClose();
    navigate("/auth/signup?type=artisan");
  };

  const handleStartSelling = () => {
    onClose();
    navigate("/sell");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border border-glass-border">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-white mb-2">
            Join Our Artisan Community
          </DialogTitle>
          <p className="text-center text-gray-300 text-lg">
            Turn your passion into profit. Start selling your handcrafted items today.
          </p>
        </DialogHeader>

        <div className="space-y-8 mt-6">
          {/* Hero Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">1,000+</div>
              <div className="text-sm text-gray-400">Active Sellers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">₹50L+</div>
              <div className="text-sm text-gray-400">Monthly Sales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">4.9★</div>
              <div className="text-sm text-gray-400">Seller Rating</div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-surface/50 border border-glass-border backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-3">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-400">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Success Story */}
          <Card className="bg-gradient-to-r from-orange-900/20 to-pink-900/20 border border-orange-500/20">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-lg font-semibold text-white mb-2">
                  "I've sold over ₹2 lakhs worth of pottery in just 3 months!"
                </div>
                <div className="text-gray-300">- Priya Sharma, Ceramic Artist from Jaipur</div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              onClick={handleJoinSeller}
              className="flex-1 h-12 text-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0"
            >
              Create Seller Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={handleStartSelling}
              variant="outline" 
              className="flex-1 h-12 text-lg border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              I Already Have Account
            </Button>
          </div>

          {/* Footer Note */}
          <p className="text-center text-sm text-gray-400">
            No setup fees • No monthly charges • Start earning immediately
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};