
import { PerplexityService } from './perplexity/perplexity.service';
import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly perplexity: PerplexityService,
  ) {}

  @Get('test-pplx')
  async testPerplexity() {
    const prompt = `
Return ONLY JSON. Nothing else.

{
  "subject": "Hello",
  "body": "World"
}
  `;
    return this.perplexity.generateEmail(prompt);
  }

}
