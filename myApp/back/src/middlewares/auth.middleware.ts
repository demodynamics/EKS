import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IAuthTokenContent } from 'src/interfaces';
import * as jwt from 'jsonwebtoken';

export interface IWhiteListItem {
  url: string;
  methods?: string[];
}

export const isWhiteListed = (whiteList: IWhiteListItem[], req: Request): boolean => {
  const item = whiteList.find(elem => elem.url == req.url);
  
  if(req.url.includes("https://alcodostavka24.online/api/imgs")) {
    return true
  }
  
  if(req.url.includes("/api/imgs")) {
    return true
  }

  if(req.url.includes("/api/list/get-category/")) {
    return true
  }
  
  if(req.url.includes("/api/list/")) {
    return true
  }

  if(req.url.includes("/api/list/get-categories")) {
    return true
  }

  return !!(
    item && (!item.methods || item.methods.find(method => method.toUpperCase() == req.method))
  );
};

export const AuthMiddleware = (whiteList: IWhiteListItem[]) => {
  return (req: Request, res: Response, next: NextFunction) => {

    if (isWhiteListed(whiteList, req)) {
      return next();
    }
    
    const token = req.headers.authorization

    if (!token) {
      throw new UnauthorizedException('No token specified');
    }
  
    const [type, content] = token.split(' ');
  
    if (type !== 'Bearer') {
      throw new BadRequestException(`Token must start with 'Bearer '`);
    }
  
    try {
      (req as any).user = jwt.verify(content, process.env.TOKEN_SECRET) as IAuthTokenContent;
      next()
    } catch (e) {
      throw new UnauthorizedException('Invalid token!!!');
    }
  };
};
