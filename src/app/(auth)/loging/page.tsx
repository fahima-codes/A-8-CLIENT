import { redirect } from 'next/navigation';

// Perohon "/loging" path e keu entry dile "/login" e patha hoy jabe
export default function LoginPageAliasRedirect() {
  redirect('/login');
}
