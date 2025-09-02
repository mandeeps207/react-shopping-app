

import NextAuth, { type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'user' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Simple demo: accept any username/password
        if (credentials?.username && credentials?.password) {
          return { id: '1', name: credentials.username };
        }
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
