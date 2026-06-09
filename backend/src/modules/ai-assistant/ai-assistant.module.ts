import { Module } from '@nestjs/common';
import { AIAssistantService } from './ai-assistant.service';
import { AIAssistantController } from './ai-assistant.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [AIAssistantController],
  providers: [AIAssistantService],
  exports: [AIAssistantService],
})
export class AIAssistantModule {}
