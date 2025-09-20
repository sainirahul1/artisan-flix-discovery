import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, Heart, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BecomePartSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Become Part of Our
            <span className="text-gradient bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Artisan Community
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of creators sharing their passion, skills, and handcrafted treasures with the world
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* For Buyers */}
          <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">For Craft Lovers</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Discover unique, handmade treasures from talented artisans. Each piece tells a story and carries the soul of its creator.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-300">
                  <Star className="h-4 w-4 text-yellow-400" />
                  Authentic handcrafted items
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <Star className="h-4 w-4 text-yellow-400" />
                  Direct support to artisans
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <Star className="h-4 w-4 text-yellow-400" />
                  Exclusive limited collections
                </li>
              </ul>
              <Button 
                variant="hero" 
                className="w-full group"
                onClick={() => navigate("/auth/signup")}
              >
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* For Artisans */}
          <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-orange-400" />
                <h3 className="text-2xl font-bold text-white">For Artisans</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Share your craft with the world. Connect directly with customers who appreciate the art and soul in handmade creations.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-300">
                  <Star className="h-4 w-4 text-yellow-400" />
                  Zero commission fees to start
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <Star className="h-4 w-4 text-yellow-400" />
                  Direct customer connections
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <Star className="h-4 w-4 text-yellow-400" />
                  Showcase your brand story
                </li>
              </ul>
              <Button 
                variant="cinematic" 
                className="w-full group"
                onClick={() => navigate("/auth/signup?type=artisan")}
              >
                Start Selling
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-1">1000+</div>
            <div className="text-gray-400">Artisans</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">25K+</div>
            <div className="text-gray-400">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">50K+</div>
            <div className="text-gray-400">Crafts Sold</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">4.9★</div>
            <div className="text-gray-400">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};