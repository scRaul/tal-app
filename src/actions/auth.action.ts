'use server';

import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

const api = 'http://localhost:8080/authenticate';
export async function signup(prevState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    rawData.name = rawData.name.toString().split(' ')[0];

    const userData = {
      username: rawData.name,
      email: rawData.email,
      password: rawData.password
    }

    let response = await fetch(`${api}/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userData)
    });
    let data = await response.json();

    if (!response.ok) {
      return {message: data.message};
    }

  } catch (error) {
    console.log(error);
    return {
      message: 'Signing up failed...Please try again later.'
    }
  }
  redirect('/login');
}
export async function login(prevState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const credintials = {email: rawData.email, password: rawData.password};

    let response = await fetch(`${api}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credintials),
    });
    let data = await response.json();

    if (!response.ok) {
      return {message: data.message, tokenObj: {}};
    }
    const {authToken, refreshToken, userId, username} = data;

    cookies().set('session', authToken.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: authToken.expires,
      path: '/',
    });
    cookies().set('refreshtoken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: refreshToken.expires,
      path: '/',
    });
    cookies().set('userId', userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: refreshToken.expires,
      path: '/',
    })
    cookies().set('username', username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: authToken.expires,
      path: '/',
    });

    return {message: data.message, tokenObj: refreshToken};
  } catch (error) {
    console.log(error);
  }
  redirect('/studio');
}

export async function signout() {
  cookies().delete('session');
  cookies().delete('userName');
  redirect('/login');
}
export async function getSession() {
  return cookies().get('session')?.value;
}
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
