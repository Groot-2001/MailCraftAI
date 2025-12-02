import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

export function logEnvSafe() {
    const envPath = path.resolve(process.cwd(), '.env');

    if (!fs.existsSync(envPath)) {
        console.warn('.env file not found. Skipping env logging.');
        return;
    }

    // Parse ONLY keys from .env file
    const fileContent = fs.readFileSync(envPath, 'utf-8');
    const parsedEnv = dotenv.parse(fileContent);

    const result: Record<string, string> = {};

    for (const [key, value] of Object.entries(parsedEnv)) {
        // mask if sensitive
        if (
            key.toLowerCase().includes('key') ||
            key.toLowerCase().includes('pass') ||
            key.toLowerCase().includes('secret') ||
            key.toLowerCase().includes('token')
        ) {
            result[key] = '*****';
        } else {
            result[key] = process.env[key] ?? '(not set)';
        }
    }

    console.log('Loaded ENV:', result);
}
