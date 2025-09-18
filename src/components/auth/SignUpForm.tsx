import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Briefcase } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SignUpFormProps {
  defaultUserType?: 'customer' | 'artisan';
  onSuccess?: () => void;
}

export const SignUpForm = ({ defaultUserType = 'customer', onSuccess }: SignUpFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone: '',
    address: '',
    user_type: defaultUserType,
    // Artisan specific fields
    business_name: '',
    description: '',
    specialties: '',
    experience_years: '',
    location: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        full_name: formData.full_name,
        phone: formData.phone,
        address: formData.address,
        user_type: formData.user_type,
      };

      await signUp(formData.email, formData.password, userData);
      
      // If artisan, create artisan profile
      if (formData.user_type === 'artisan') {
        // This will be handled after email verification
      }

      onSuccess?.();
      navigate('/auth/signin');
    } catch (error) {
      // Error handled in AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUserTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      user_type: value as 'customer' | 'artisan'
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold text-center text-white">
          ✨ Join CraftVerse Community
        </CardTitle>
        <p className="text-center text-gray-400">
          Start your journey in the world of handcrafted treasures
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Type Selection */}
          <div className="space-y-3">
            <Label>I want to</Label>
            <RadioGroup
              value={formData.user_type}
              onValueChange={handleUserTypeChange}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="customer" id="customer" />
                <Label htmlFor="customer">Buy Crafts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="artisan" id="artisan" />
                <Label htmlFor="artisan">Sell Crafts</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Basic Information */}
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="Your full name"
                value={formData.full_name}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-10 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Artisan Specific Fields */}
          {formData.user_type === 'artisan' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="business_name">Business Name</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="business_name"
                    name="business_name"
                    type="text"
                    placeholder="Your craft business name"
                    value={formData.business_name}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialties">Craft Specialties</Label>
                <Input
                  id="specialties"
                  name="specialties"
                  type="text"
                  placeholder="e.g., Pottery, Textiles, Woodwork"
                  value={formData.specialties}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || formData.password !== formData.confirmPassword}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <div className="text-center">
            <Link
              to={`/auth/signin${formData.user_type === 'artisan' ? '?type=artisan' : ''}`}
              className="text-sm text-accent hover:underline"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};