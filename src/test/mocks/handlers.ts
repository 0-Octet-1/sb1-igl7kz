import { rest } from 'msw';
import { mockUsers, mockCourses, mockProgress, mockRatings } from './data';

export const handlers = [
  // Gestion des utilisateurs
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json(mockUsers));
  }),

  rest.get('/api/users/:id', (req, res, ctx) => {
    const user = mockUsers.find(u => u.id === req.params.id);
    return res(ctx.json(user));
  }),

  // Gestion des formations
  rest.get('/api/courses', (req, res, ctx) => {
    return res(ctx.json(mockCourses));
  }),

  rest.get('/api/courses/:id', (req, res, ctx) => {
    const course = mockCourses.find(c => c.id === req.params.id);
    return res(ctx.json(course));
  }),

  // Gestion des progrès
  rest.get('/api/progress/:userId/:courseId', (req, res, ctx) => {
    if (req.params.userId === mockProgress.userId && 
        req.params.courseId === mockProgress.courseId) {
      return res(ctx.json(mockProgress));
    }
    return res(ctx.status(404));
  }),

  // Gestion des évaluations
  rest.get('/api/ratings/:courseId', (req, res, ctx) => {
    const ratings = mockRatings.filter(r => r.courseId === req.params.courseId);
    return res(ctx.json(ratings));
  }),

  rest.post('/api/ratings', async (req, res, ctx) => {
    const body = await req.json();
    const newRating = {
      id: `rating-${Date.now()}`,
      ...body,
      createdAt: new Date()
    };
    return res(ctx.json(newRating));
  })
];