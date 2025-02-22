import OpenAI from 'openai';

export interface ClassificationResult {
  category: string;
  confidence: number;
  recommendations: string[];
}

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your .env file.');
}

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, you should proxy requests through your backend
});

export const classifyImage = async (imageFile: File): Promise<ClassificationResult> => {
  try {
    // Convert File to base64
    const base64Image = await fileToBase64(imageFile);
    
    // Prepare the prompt
    const systemPrompt = `You are an expert waste classification system. Analyze the image and classify the waste item shown.
    You must respond in JSON format with exactly these fields:
    {
      "category": "recyclable" or "organic" or "non-recyclable",
      "confidence": a number between 0 and 1,
      "recommendations": an array of 3-4 specific recommendations for handling this item
    }`;

    // Make API call to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Classify this waste item:" },
            {
              type: "image_url",
              image_url: {
                url: `data:${imageFile.type};base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 500,
      temperature: 0.2
    });

    const textResponse = response.choices[0]?.message?.content || '';
    
    try {
      // Try to parse the response as JSON
      const parsedResponse = JSON.parse(textResponse);
      return {
        category: parsedResponse.category,
        confidence: parsedResponse.confidence,
        recommendations: parsedResponse.recommendations || getDefaultRecommendations(parsedResponse.category)
      };
    } catch (parseError) {
      // If parsing fails, extract information from text response
      const defaultResult = extractFromText(textResponse);
      return {
        ...defaultResult,
        recommendations: getDefaultRecommendations(defaultResult.category)
      };
    }
  } catch (error) {
    console.error('Error classifying image:', error);
    throw new Error('Failed to classify image. Please try again.');
  }
};

// Helper function to convert File to base64
const fileToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Helper function to extract classification from text response
const extractFromText = (text: string): { category: string; confidence: number } => {
  const lowerText = text.toLowerCase();
  let category = 'non-recyclable';
  let confidence = 0.7;

  if (lowerText.includes('recycl')) {
    category = 'recyclable';
  } else if (lowerText.includes('organic') || lowerText.includes('compost')) {
    category = 'organic';
  }

  // Try to extract confidence value if present
  const confidenceMatch = text.match(/confidence:\s*(0\.\d+)/i) || 
                         text.match(/(\d+(?:\.\d+)?)\s*%/);
  if (confidenceMatch) {
    confidence = parseFloat(confidenceMatch[1]);
    // Convert percentage to decimal if needed
    if (confidence > 1) {
      confidence = confidence / 100;
    }
  }

  return { category, confidence };
};

// Fallback recommendations if the AI doesn't provide them
const getDefaultRecommendations = (category: string): string[] => {
  switch (category.toLowerCase()) {
    case 'recyclable':
      return [
        'Clean the item before recycling',
        'Remove any non-recyclable parts',
        'Check local recycling guidelines',
        'Place in recycling bin',
      ];
    case 'organic':
      return [
        'Remove any non-organic materials',
        'Consider composting if possible',
        'Place in organic waste bin',
        'Keep separate from other waste types',
      ];
    case 'non-recyclable':
      return [
        'Consider reuse options if possible',
        'Check for recyclable components',
        'Dispose in general waste bin',
        'Look for eco-friendly alternatives',
      ];
    default:
      return [
        'Check local disposal guidelines',
        'Separate different materials if possible',
        'Consider environmental impact',
        'Look for sustainable alternatives',
      ];
  }
}; 