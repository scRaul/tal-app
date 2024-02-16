export interface User {
  userId: number;
  email: string;
  name: string;
}

export interface Course {
  courseId: number;
  creatorId: number;
  thumbnail: string;
  title: string;
  description: string;
  published: boolean;
}

export interface Module {
  moduleId: number;
  courseId: number;
  title: string;
  index: number;
  published: boolean;
}

export interface Lesson {
  lessonId: number;
  moduleId: number;
  title: string;
  content: string;
  index: number;
  published: boolean;
}