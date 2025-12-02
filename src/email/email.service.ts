import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailEntity } from './entities/email.entity';
import { PerplexityService } from '../perplexity/perplexity.service';
import { GenerateEmailDto } from './dto/generate-email.dto';

@Injectable()
export class EmailService {
    constructor(
        @InjectRepository(EmailEntity)
        private readonly repo: Repository<EmailEntity>,

        private readonly perplexity: PerplexityService,
    ) { }

    private buildPrompt(dto: GenerateEmailDto): string {
        return `
You are an email writing assistant. Generate a clean, professional email.

Return ONLY valid JSON in this structure:
{
  "subject": "...",
  "body": "..."
}

CONTEXT:
- Raw message: ${dto.raw_message}
- Email type: ${dto.type}
- Tone: ${dto.tone}
- Target audience: ${dto.target_audience || 'general'}

Output must be JSON ONLY. No markdown. No explanation.
    `;
    }

    // 2. Main function called by controller
    async generateEmail(dto: GenerateEmailDto) {
        try {
            const prompt = this.buildPrompt(dto);

            // Call Perplexity
            const ai = await this.perplexity.generateEmail(prompt);

            // Store in DB
            const saved = await this.repo.save({
                raw_message: dto.raw_message,
                type: dto.type,
                tone: dto.tone,
                target_audience: dto.target_audience,
                generated_subject: ai.subject,
                generated_body: ai.body,
                model_used: 'sonar-pro',
            });

            // Response format for API
            this.printEmailLog(dto, ai, saved);
            return {
                subject: ai.subject,
                body: this.formatBody(ai.body),
            };
        } catch (err) {
            console.error('EmailService Error:', err);
            throw new InternalServerErrorException('Failed to generate email');
        }
    }

    private printEmailLog(dto: GenerateEmailDto, ai: any, saved: EmailEntity) {
        console.log("\n");
        console.log("─────────────────────────────────────────────────────────────");
        console.log("                     MAILCRAFT AI RESULT                      ");
        console.log("─────────────────────────────────────────────────────────────");

        console.log("RAW MESSAGE:");
        console.log(`  ${dto.raw_message}`);
        console.log(" ");

        console.log("GENERATED EMAIL:");
        console.log(`  SUBJECT: ${ai.subject}`);
        console.log(`  BODY:\n${ai.body}`);
        console.log(" ");

        console.log("META INFORMATION:");
        console.log(`  Type:   ${dto.type}`);
        console.log(`  Tone:   ${dto.tone}`);
        console.log(`  Audience: ${dto.target_audience || "N/A"}`);
        console.log(`  Model:  pplx-70b-chat`);
        console.log(`  Created At: ${saved.created_at}`);
        console.log(" ");

        console.log("DATABASE:");
        console.log(`  Row ID: ${saved.id}`);
        console.log("─────────────────────────────────────────────────────────────\n");
    }

    private formatBody(body: string): string {
        let formatted = body.trim();

        // Normalize blank lines
        formatted = formatted.replace(/\n{3,}/g, "\n\n");

        // Ensure bullet points are clean
        formatted = formatted.replace(/\n-\s*/g, "\n- ");

        // Add a newline before signature if missing
        if (!formatted.endsWith("Regards") && !formatted.endsWith("Best regards")) {
            formatted += "\n\nBest regards,\nMailCraftAI";
        }

        return formatted;
    }

}
