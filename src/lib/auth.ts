import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (
          credentials?.email === 'demo1234@gmail.com' &&
          credentials?.password === 'demo1234'
        ) {
          return { id: '1', name: 'John Doe', email: 'demo1234@gmail.com', role: 'Admin' };
        }
        return null;
      },
    }),
  ],
  pages: { signIn: '/auth/login' },
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role ?? 'Admin';
      return token;
    },
    session({ session, token }) {
      if (session.user) (session.user as { role?: string }).role = token.role as string;
      return session;
    },
  },
});
