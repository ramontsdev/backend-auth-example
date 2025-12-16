import { NextFunction, Request, Response } from 'express';

import { env } from '@/main/config/env';

export function expressCors(request: Request, response: Response, next: NextFunction) {
  const allowedOrigins = env.allowedOrigins.split(',');

  const origin = request.header('origin');
  const isAllowed = allowedOrigins.includes(origin!);

  if (isAllowed) {
    response.setHeader('Access-Control-Allow-Origin', origin!);
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Allow-Max-Age', '10');
  }

  next();
}
