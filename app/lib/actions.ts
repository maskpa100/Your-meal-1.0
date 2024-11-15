'use server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    const ww = await signIn('credentials', formData);
    console.log(ww);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Неверные учетные данные.';
        case 'CredentialsSignin':
          throw error;
        default:
          return 'Что-то пошло не так.';
      }
    }
    throw error;
  }
}
