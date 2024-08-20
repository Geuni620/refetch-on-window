import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/hello', () => {
    console.log('msw:get :: /hello');
    return HttpResponse.json({
      data: 'Captured a "GET /hello" request',
    });
  }),
];
