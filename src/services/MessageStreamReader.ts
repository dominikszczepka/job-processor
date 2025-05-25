export class MessageStreamReader {
    private llmUrl: string;
    private llmVersion: string;
    private decoder: TextDecoder;

    constructor(llmUrl: string, llmVersion: string) {
        this.llmUrl = llmUrl;
        this.llmVersion = llmVersion;
        this.decoder = new TextDecoder('utf-8');
    }

    async readResponsesFromPrompt(prompt: string): Promise<string[]> {
        const apiResponse = await fetch(this.llmUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "model": this.llmVersion,
                "prompt": prompt,
                "stream": true,
                "format": "json"
            }),
        });

        if (!apiResponse.ok || !apiResponse.body) {
            throw new Error(`LLM API request failed with status ${apiResponse.status} body ${apiResponse.body}`);
        }

        const reader = apiResponse.body.getReader();
        const responses: string[] = [];
        let buffer = '';
        while (true) {
            const { value, done: readerDone } = await reader.read();
            if (readerDone)
                break;
            if (value) {
                buffer += this.decoder.decode(value, { stream: true });
                let lines = buffer.split('\n');
                // Keep the last line in the buffer if it's incomplete
                buffer = lines.pop() || '';
                for (const line of lines) {
                    if (line.trim()) {
                        try {
                            const json = JSON.parse(line);
                            if (json.response && !json.done) {
                                responses.push(json.response || '');
                            }
                        } catch (err) {
                            // If parsing fails, prepend to buffer for next chunk
                            buffer = line + '\n' + buffer;
                            break;
                        }
                    }
                }
            }
        }
        // Try to parse any remaining buffer after the stream ends
        if (buffer.trim()) {
            try {
                const json = JSON.parse(buffer);
                if (json.response && !json.done) {
                    responses.push(json.response || '');
                }
            } catch (err) {
                console.error('Failed to parse final buffer chunk:', buffer);
            }
        }
        return responses;
    }
} 