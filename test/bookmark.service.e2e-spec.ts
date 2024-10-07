import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { BookmarkService } from '../src/bookmark/bookmark.service';
import { CreateBookmarkDto } from '../src/bookmark/dto';
import { PrismaService } from '../src/prisma/prisma.service';

describe('BookmarkService Integration Test', () => {
  let service: BookmarkService;
  let prismaService: PrismaService;
  const createdBookmarkIds: number[] = [];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    service = module.get<BookmarkService>(BookmarkService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    // 테스트 후 정리 작업
    // 테스트 중 생성된 북마크만 삭제합니다
    await prismaService.bookmark.deleteMany({
      where: {
        id: {
          in: createdBookmarkIds
        }
      }
    });
    await prismaService.$disconnect();
  });

  beforeEach(async () => {
    // createdBookmarkIds = [];
  });

  describe('create bookmark', () => {
    it('create bookmark', async () => {
      const dto: CreateBookmarkDto = { title: 'Test', link: 'http://test.com', userId: 1 };

      const result = await service.create(dto);

      createdBookmarkIds.push(result.id);

      expect(result).toHaveProperty('id');
      expect(result.title).toBe(dto.title);
      expect(result.link).toBe(dto.link);
      expect(result.userId).toBe(dto.userId);
    });
  });

  describe('findAll bookmark', () => {
    it('findAll bookmark', async () => {
      const results = await service.findAll();

      expect(Array.isArray(results)).toBe(true);
      // expect(results.length).toBe(2);
      // expect(results[0]).toHaveProperty('id');
      // expect(results[1]).toHaveProperty('id');
    });
  });

  describe('find my bookmarks', () => {
    it('find my bookmarks', async () => {
      const userId = 1;
      const results = await service.findMyBookmarks({ id: userId });

      expect(Array.isArray(results)).toBe(true);
      expect(results[0].userId).toBe(userId);
    });
  });
});
