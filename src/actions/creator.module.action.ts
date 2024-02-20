'use server';


import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';



const api = 'http://localhost:8080/module';


export async function createModule(title: string, courseId: string) {
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return {
        message: 'unable to verify user'
      }
    }
    var form = new FormData();
    form.append('title', title);
    form.append('courseId', courseId);


    let response = await fetch(`${api}/create`, {
      method: 'POST',
      headers: {'Authorization': 'bearer ' + token},
      body: form,
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(data);
      return {
        message: data.message
      }
    }
    revalidateTag('CourseContent')
    return {module: data.module};
  } catch (err) {
    console.log(err);
    return {
      message: 'there appears to be an error on our end.Please try again later'
    }
  }
}

export async function deleteModule(id: number) {
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return {
        message: 'unable to verify user'
      }
    }
    let response = await fetch(`${api}/delete/${id}`, {
      method: 'DELETE',
      headers: {'Authorization': 'bearer ' + token},
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(data);
      return {
        message: data.message
      }
    }

    revalidateTag('CourseContent');
    return {
      message: 'deleted'
    }
  } catch (error) {
    console.log(error);
    return {
      message: error
    }
  }
}