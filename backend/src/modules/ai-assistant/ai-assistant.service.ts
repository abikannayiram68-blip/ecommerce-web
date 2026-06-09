import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Injectable()
export class AIAssistantService {
  constructor(private productsService: ProductsService) {}

  async getResponse(query: string) {
    try {
      const results = await this.productsService.search(query);
      
      let responseText = `I can help you with "${query}". `;
      
      if (results.products && results.products.length > 0) {
        responseText += `I found ${results.products.length} product(s) that might match what you're looking for:\n\n`;
        results.products.slice(0, 3).forEach((p: any) => {
          responseText += `• ${p.name} - $${p.price}\n`;
        });
        if (results.products.length > 3) {
          responseText += `\nAnd ${results.products.length - 3} more! Check them out in the products page.`;
        }
      } else {
        responseText += `Unfortunately, I couldn't find any specific products matching that right now. Try searching for something else!`;
      }

      return { query, response: responseText, timestamp: new Date().toISOString() };
    } catch (error) {
      return { query, response: `I understood your query for "${query}", but I'm having trouble accessing the product catalog right now.`, timestamp: new Date().toISOString() };
    }
  }
}
