import React from 'react';
import { LoginScreen } from '@/screen/LoginScreen';

export default async function LoginPage() {
  try {
    return <LoginScreen />
  }
  catch (error) {
    console.error(error);
    return <div>Что-то пошло не так</div>
  }
}
