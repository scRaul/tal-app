'use server';


import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';



const api = 'http://localhost:8080/course';


export async function createCourse(prevState: any, formData: FormData) {
  const thumbnail =
      'https://www.freecodecamp.org/news/content/images/2022/11/laptop-gfe4d4bfc0_1280.png';
  const description = 'About my new course.'
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return {
        message: 'unable to verify user'
      }
    }
    const title = formData.get('title');
    if (!title) {
      return {
        message: 'missing title field'
      }
    }
    var form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append('thumbnail', thumbnail);

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


  } catch (err) {
    console.log(err);
  }
  redirect('/studio/course');
}
export async function getMyCourses() {
  const token = cookies().get('session')?.value;

  if (!token) {
    return {
      message: 'unable to verify user'
    }
  }
  try {
    const response = await fetch(`${api}/my-courses`, {
      method: 'GET',
      headers: {'Authorization': 'bearer ' + token},
    });
    if (!response.ok) {
      return {message: 'Unable to retrieve courses'};
    }

    const data = await response.json();
    return {courses: data.courses};
  } catch (err) {
    console.error('Error fetching courses:', err);
    return {message: 'Error fetching courses'};
  }
}

export async function getCourseById(id: string) {
  try {
    const response = await fetch(`${api}/id/${id}`, {
      method: 'GET',
    });
    const data = await response.json();
    if (!response.ok) {
      return {message: data.message};
    }

    return {course: data.course};
  } catch (err) {
    console.error('Error fetching courses:', err);
    return {message: 'Error fetching courses'};
  }
}