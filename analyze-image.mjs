import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function analyzeImage() {
  try {
    const zai = await ZAI.create();
    
    // Read image as base64
    const imageBuffer = fs.readFileSync('/home/z/my-project/upload/Screenshot_2026-02-17_02-45-23.png');
    const base64Image = imageBuffer.toString('base64');
    
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a senior UI/UX designer and SEO specialist. Analyze mobile UI designs thoroughly, focusing on:
1. Visual design patterns and aesthetics
2. Mobile UX best practices
3. Programmatic SEO opportunities
4. Component architecture
5. User experience flow
6. Accessibility considerations
7. Conversion optimization elements`
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this Stitch Projects mobile UI screenshot in detail. I need you to:\n\n1. Describe all UI elements visible\n2. Identify the design patterns used\n3. Note any programmatic SEO elements (URLs, content structure, navigation patterns)\n4. Evaluate the overall feel and aesthetic\n5. Identify strengths and potential improvements\n6. Suggest how these patterns could be applied to a dental website\n\nPlease be very detailed and thorough in your analysis.'
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/png;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 4000
    });

    console.log('=== UI/UX ANALYSIS ===\n');
    console.log(completion.choices[0]?.message?.content);
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
  }
}

analyzeImage();
