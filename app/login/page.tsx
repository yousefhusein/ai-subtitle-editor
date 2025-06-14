'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Card, CardBody } from '@nextui-org/react';
import { IconMail, IconLock } from '@tabler/icons-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-zinc-800">
        <CardBody className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-zinc-400 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                startContent={<IconMail className="text-zinc-400" size={20} />}
                classNames={{
                  input: "text-white",
                  inputWrapper: "bg-zinc-800/50 border-zinc-700",
                }}
                required
              />
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                startContent={<IconLock className="text-zinc-400" size={20} />}
                classNames={{
                  input: "text-white",
                  inputWrapper: "bg-zinc-800/50 border-zinc-700",
                }}
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium"
              isLoading={isLoading}
            >
              Sign In
            </Button>

            <div className="text-center text-sm text-zinc-400">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/signup')}
                className="text-blue-500 hover:text-blue-400"
              >
                Sign up
              </button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
} 