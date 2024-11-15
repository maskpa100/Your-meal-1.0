'use server';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import type { User } from '@/app/lib/types';
import { authConfig } from './auth.config';
import { user } from './data';

async function getUser(email: string): Promise<User | undefined> {
  try {
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await getUser('email');
        if (!user) return null;

        if (password === user.password) return user;

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
