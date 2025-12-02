import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PerplexityService {
    private readonly apiKey: string;
    private readonly url = 'https://api.perplexity.ai/chat/completions';

    constructor(private readonly config: ConfigService) {
        this.apiKey = this.config.get<string>('perplexityApiKey');

        if (!this.apiKey) {
            throw new Error('PERPLEXITY_API_KEY is missing in environment variables.');
        }
    }

    async generateEmail(prompt: string): Promise<{ subject: string; body: string }> {
        try {
            const response = await axios.post(
                this.url,
                {
                    model: 'sonar-pro',
                    messages: [
                        { role: 'user', content: prompt },
                    ],
                    temperature: 0.3,
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            const content = response.data.choices[0].message.content;
            console.log("=== RAW SONAR-PRO OUTPUT ===");
            console.log(response.data.choices[0].message.content);

            let raw = response.data.choices[0].message.content || "";

            console.log("=== RAW SONAR-PRO OUTPUT ===");
            console.log(raw);


            let cleaned = raw
                .replace(/```json/gi, "")
                .replace(/```/g, "")
                .replace(/“|”/g, '"') // curly quotes → straight quotes
                .trim();

            // STEP 2 — Extract ONLY the JSON inside braces
            const firstBrace = cleaned.indexOf("{");
            const lastBrace = cleaned.lastIndexOf("}");

            if (firstBrace === -1 || lastBrace === -1) {
                throw new InternalServerErrorException("Sonar-pro did not return JSON.");
            }

            cleaned = cleaned.substring(firstBrace, lastBrace + 1);

            console.log("=== CLEANED JSON BLOCK ===");
            console.log(cleaned);

            const parsed = JSON.parse(cleaned);


            return {
                subject: parsed.subject,
                body: parsed.body,
            };
        } catch (error: any) {
            console.error(
                'Perplexity API Error:',
                error.response?.data || error.message || error,
            );
            throw new InternalServerErrorException(
                'Perplexity email generation failed',
            );
        }
    }
}
