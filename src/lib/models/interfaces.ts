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
  isPublic: boolean
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  moduleId: number;
  courseId: number;
  title: string;
  index: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  lessonId: number;
  moduleId: number;
  title: string;
  content: string;
  index: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseModule {
  moduleId: number;
  courseId: number;
  title: string;
  index: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  lessons: Omit<Lesson, 'content'>[];
}