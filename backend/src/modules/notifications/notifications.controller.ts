import { Controller, Get, Put, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotificationsService } from './notifications.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  async findByUser(@CurrentUser() user: any) {
    return this.notificationsService.findByUser(user.id);
  }

  @Get('unread-count')
  async unreadCount(@CurrentUser() user: any) {
    return this.notificationsService.unreadCount(user.id);
  }

  @Put(':id/read')
  async markAsRead(@CurrentUser() user: any, @Param('id') id: number) {
    return this.notificationsService.markAsRead(user.id, id);
  }
}
