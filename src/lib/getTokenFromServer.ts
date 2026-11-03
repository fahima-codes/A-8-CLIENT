import { authClient } from '@/lib/auth-client';

// add-studio er motoi better-auth theke JWT token ene dey —
// mutating request gulo (POST / PATCH / DELETE) ei token ke
// `Authorization: Bearer <token>` header hisebe pathay, server 401
// dibe jodi token na thake.
export async function getAuthToken(): Promise<string | null> {
  const { data: tokenData, error: tokenError } = await authClient.token();

  if (tokenError || !tokenData?.token) {
    return null;
  }

  return tokenData.token;
}
