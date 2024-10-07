import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  public async create(createBookmarkDto: CreateBookmarkDto) {
    return await this.prisma.bookmark.create({ data: createBookmarkDto });
  }

  public async findAll() {
    return await this.prisma.bookmark.findMany();
  }

  public async findMyBookmarks({ id }) {
    return await this.prisma.bookmark.findMany({ where: { userId: id } });
  }

  public async findOne(id: number) {
    return await this.prisma.bookmark.findUnique({ where: { id } });
  }

  //   public async update(id: string, updateArticleDto: UpdateArticleDto) {
  //     return await this.prisma.article.update({
  //       where: { id },
  //       data: updateArticleDto
  //     });
  //   }

  //   public async remove(id: string) {
  //     return await this.prisma.article.delete({ where: { id } });
  //   }
}
