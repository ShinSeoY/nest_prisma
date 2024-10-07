// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { JwtService } from '@nestjs/jwt';
// import { PrismaService } from '../src/prisma/prisma.service';
// import { AppModule } from '../src/app.module';
// import { CreateBookmarkDto } from '../src/bookmark/dto';

// describe('BookmarkController (e2e)', () => {
//   let app: INestApplication;
//   let prisma: PrismaService;
//   let jwtService: JwtService;
//   let createdUserIds: string[] = [];
//   let createdBookmarkIds: string[] = [];

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule]
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();

//     prisma = app.get(PrismaService);
//     jwtService = app.get(JwtService);
//   });

//   afterAll(async () => {
//     // 테스트 중 생성된 북마크와 사용자만 삭제합니다
//     // await prisma.bookmark.deleteMany({
//     //   where: {
//     //     id: {
//     //       in: createdBookmarkIds
//     //     }
//     //   }
//     // });
//     // await prisma.user.deleteMany({
//     //   where: {
//     //     id: {
//     //       in: createdUserIds
//     //     }
//     //   }
//     // });
//     await app.close();
//   });

//   beforeEach(() => {
//     // 각 테스트 전에 추적 배열을 초기화합니다
//     createdUserIds = [];
//     createdBookmarkIds = [];
//   });

//   describe('/bookmark (POST)', () => {
//     it('create bookmark', async () => {
//       //   const user = await prisma.user.create({
//       //     data: { email: 'test@example.com', password: 'password' }
//       //   });
//       //   createdUserIds.push(user.id);

//       const token = jwtService.sign({ userId: 'user1@test.kr', email: user.email });

//       const createBookmarkDto: CreateBookmarkDto = {
//         title: '테스트 북마크',
//         url: 'https://test.com'
//       };

//       const response = await request(app.getHttpServer())
//         .post('/bookmark')
//         .set('Authorization', `Bearer ${token}`)
//         .send(createBookmarkDto)
//         .expect(201);

//       expect(response.body).toHaveProperty('id');
//       expect(response.body.title).toBe(createBookmarkDto.title);
//       expect(response.body.url).toBe(createBookmarkDto.url);
//       expect(response.body.userId).toBe(user.id);

//       createdBookmarkIds.push(response.body.id);

//       // 생성된 북마크를 확인합니다
//       const createdBookmark = await prisma.bookmark.findUnique({
//         where: { id: response.body.id }
//       });
//       expect(createdBookmark).toBeDefined();
//     });
//   });

//   describe('/bookmark (GET)', () => {
//     it('모든 북마크를 가져와야 합니다', async () => {
//       const user = await prisma.user.create({
//         data: { email: 'test2@example.com', password: 'password' }
//       });
//       createdUserIds.push(user.id);

//       const bookmarks = await prisma.bookmark.createMany({
//         data: [
//           { title: '북마크 1', url: 'https://test1.com', userId: user.id },
//           { title: '북마크 2', url: 'https://test2.com', userId: user.id }
//         ]
//       });
//       const createdBookmarks = await prisma.bookmark.findMany({
//         where: { userId: user.id }
//       });
//       createdBookmarkIds.push(...createdBookmarks.map(b => b.id));

//       const token = jwtService.sign({ userId: user.id, email: user.email });

//       const response = await request(app.getHttpServer())
//         .get('/bookmark')
//         .set('Authorization', `Bearer ${token}`)
//         .expect(200);

//       expect(response.body.length).toBeGreaterThanOrEqual(2);
//       expect(response.body[0]).toHaveProperty('id');
//       expect(response.body[0]).toHaveProperty('title');
//       expect(response.body[0]).toHaveProperty('url');
//     });
//   });

//   describe('/bookmark/my (GET)', () => {
//     it('사용자의 북마크만 가져와야 합니다', async () => {
//       const user1 = await prisma.user.create({
//         data: { email: 'user1@example.com', password: 'password' }
//       });
//       const user2 = await prisma.user.create({
//         data: { email: 'user2@example.com', password: 'password' }
//       });
//       createdUserIds.push(user1.id, user2.id);

//       const bookmarks = await prisma.bookmark.createMany({
//         data: [
//           { title: '유저1 북마크', url: 'https://test1.com', userId: user1.id },
//           { title: '유저2 북마크', url: 'https://test2.com', userId: user2.id }
//         ]
//       });
//       const createdBookmarks = await prisma.bookmark.findMany({
//         where: { userId: { in: [user1.id, user2.id] } }
//       });
//       createdBookmarkIds.push(...createdBookmarks.map(b => b.id));

//       const token = jwtService.sign({ userId: user1.id, email: user1.email });

//       const response = await request(app.getHttpServer())
//         .get('/bookmark/my')
//         .set('Authorization', `Bearer ${token}`)
//         .expect(200);

//       expect(response.body.length).toBeGreaterThanOrEqual(1);
//       expect(response.body[0].title).toBe('유저1 북마크');
//       expect(response.body[0].userId).toBe(user1.id);
//     });
//   });
// });
