import { Bookmark, User } from '@prisma/client';
import { BookmarkDto, UserDto } from '../dto';

export class BookmarkEntity implements Bookmark {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  //
  public title: string;
  public link: string;
  public description: string | null;
  //   public role: number;

  constructor(partial: Partial<Bookmark>) {
    Object.assign(this, partial);
  }
}

export const toBookmarkDto = (data: BookmarkEntity): BookmarkDto => {
  const { createdAt, updatedAt, ...result } = data;
  return result;
};
