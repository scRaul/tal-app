'use server';

import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

const api = 'http://localhost:8080/authenticate';
export async function signup(prevState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    rawData.name = rawData.name.toString().split(' ')[0];

    const form = new FormData();
    Object.keys(rawData).forEach((key) => {
      form.append(key, rawData[key]);
    });

    let response = await fetch(`${api}/signup`, {
      method: 'POST',
      body: form,
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
    let response = await fetch(`${api}/login`, {
      method: 'POST',
      body: formData,
    });
    let data = await response.json();

    if (!response.ok) {
      return {message: data.message};
    }
    cookies().set('session', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    cookies().set('userName', data.user.name, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    })
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
