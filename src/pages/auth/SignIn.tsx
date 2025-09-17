import { useSearchParams } from 'react-router-dom';
import { SignInForm } from '@/components/auth/SignInForm';
import { Navigation } from '@/components/Navigation';

export default function SignIn() {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') as 'customer' | 'artisan' || 'customer';

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <SignInForm userType={userType} />
        </div>
      </div>
    </div>
  );
}