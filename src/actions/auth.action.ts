'use server';

import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

const api = 'http://localhost:8080';
export async function signup(prevState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    rawData.name = rawData.name.toString().split(' ')[0];

    const form = new FormData();
    Object.keys(rawData).forEach((key) => {
      form.append(key, rawData[key]);
    });

    let response = await fetch(`${api}/users/signup`, {
      method: 'POST',
      body: form,
    });
    let data = await response.json();

    if (!response.ok) {
      return {message: data.message};
    }
  } catch (error) {
    console.log(error);
  }

  redirect('/');
}
export async function login(prevState: any, formData: FormData) {
  try {
    let response = await fetch(`${api}/users/login`, {
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
      maxAge: 60 * 5,  // One week
      path: '/',
    });
  } catch (error) {
    console.log(error);
  }
  redirect('/');
}

export async function authenticate() {
  const cookiesList = cookies();
  if (!cookiesList.has('session')) {
    return false;
  }
  const token = cookiesList.get('session');
  console.log(token);
  return true;
}
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
