import NextAuth from 'next-auth';
import { authOptions } from './auth';

// Auth handler
const handler = NextAuth(authOptions);

// Export the handler as GET and POST methods
export { handler as GET, handler as POST }; 