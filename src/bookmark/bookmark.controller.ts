import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Logger,
  UseFilters,
  UseGuards,
  UseInterceptors,
  Request,
  Body,
  Post
} from '@nestjs/common';
import { PrismaClientExceptionFilter } from '../prisma-client-exception.filter';
import { BookmarkService } from './bookmark.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';
import { toBookmarkDto } from './entity/bookmark.entity';
import { CreateBookmarkDto } from './dto';

@Controller('bookmark')
@UseFilters(PrismaClientExceptionFilter)
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookmarkController {
  private readonly logger = new Logger(BookmarkController.name);

  constructor(private readonly bookmakrService: BookmarkService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('')
  @Roles(Role.USER, Role.ADMIN)
  public async createBookmark(@Request() req, @Body() createBookmarkDto: CreateBookmarkDto) {
    console.log('req.user: ', req.user);
    createBookmarkDto.userId = req.user.id;
    return toBookmarkDto(await this.bookmakrService.create(createBookmarkDto));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  @Roles(Role.USER, Role.ADMIN)
  public async finAllbookmarks(@Request() req) {
    console.log('req.user: ', req.user);
    const bookmarks = await this.bookmakrService.findAll();
    return bookmarks.map(bookmark => toBookmarkDto(bookmark));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/my')
  @Roles(Role.USER, Role.ADMIN)
  public async finMybookmarks(@Request() req) {
    console.log('req.user: ', req.user);
    const bookmarks = await this.bookmakrService.findMyBookmarks(req.user);
    return bookmarks.map(bookmark => toBookmarkDto(bookmark));
  }
}
