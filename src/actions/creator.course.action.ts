'use server';


import {revalidateTag} from 'next/cache';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';



const api = 'http://localhost:8080/course';


export async function createCourse(title: string) {
  const thumbnail =
      'https://www.freecodecamp.org/news/content/images/2022/11/laptop-gfe4d4bfc0_1280.png';
  const description = 'About my new course.'
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return {message: 'unable to verify user'};
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
    return {course: data.course};
  } catch (err) {
    console.log(err);
    return {
      message: 'there appears to be an error on our end.Please try again later'
    }
  }
}
export async function updateCourse(prevState: any, formData: FormData) {
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return {message: 'unable to verify user'};
    }
    const rawData = Object.fromEntries(formData.entries());
    const isPublic = formData.get('isPublic') === 'on' ? 'true' : 'false';
    const form = new FormData();
    Object.keys(rawData).forEach((key) => {
      form.append(key, rawData[key]);
    });
    form.append('isPublic', isPublic);
    let response = await fetch(`${api}/update`, {
      method: 'PUT',
      headers: {'Authorization': 'bearer ' + token},
      body: form,
    });
    let data = await response.json();

    if (!response.ok) {
      return {message: data.message};
    }
    revalidateTag('CourseInfo');
    return {
      message: 'successfully updated course', course: data.course
    }
  } catch (err) {
    return {message: err};
  }
}
export async function deleteCourse(id: number) {
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
  } catch (error) {
    console.log(error);
    return {
      message: error
    }
  }
  redirect('/studio');
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
    const data = await response.json();
    if (!response.ok) {
      console.log(data.message)
      return {message: 'Unable to retrieve courses'};
    }
    return {courses: data.courses};
  } catch (err) {
    console.error('Error fetching courses:', err);
    return {message: 'Error fetching courses'};
  }
}

export async function getCourseById(id: string) {
  try {
    const response = await fetch(
        `${api}/get/${id}`, {method: 'GET', next: {tags: ['CourseInfo']}});
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

export async function getCourseContent(courseId: string) {
  try {
    const response = await fetch(
        `${api}/content/${courseId}`,
        {method: 'GET', next: {tags: ['CourseContent']}});
    const data = await response.json();
    if (!response.ok) {
      return {message: data.message};
    }

    return {content: data.content};
  } catch (err) {
    console.error('Error fetching courses:', err);
    return {message: 'Error fetching courses'};
  }
}