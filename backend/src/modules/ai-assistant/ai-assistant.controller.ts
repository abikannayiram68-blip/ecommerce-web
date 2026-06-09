import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AIAssistantService } from './ai-assistant.service';

@Controller('ai-assistant')
@UseGuards(AuthGuard('jwt'))
export class AIAssistantController {
  constructor(private readonly aiAssistantService: AIAssistantService) {}

  @Post('ask')
  async ask(@Body() body: { query: string }) {
    return this.aiAssistantService.getResponse(body.query);
  }
}
