import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeScam(input: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert crypto scam investigator for 'SafeCrypto BD'.
Analyze the following input and provide a risk assessment:
Input: ${input}

Return a JSON object with:
{
  "rating": "Safe" | "Caution" | "Scam",
  "score": number (0-100, 100 being most dangerous),
  "summary": "Short explanation",
  "detailedReasons": ["reason 1", "reason 2"],
  "evidence": "Description of evidence found or context",
  "safePractices": ["tip 1", "tip 2"]
}

Be strict. If it is a Telegram group promising 10x returns, it is a scam. If it is a token with no liquidity lock, it is a caution/scam.`,
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Scam Analysis Error:", error);
    return {
      rating: "Caution",
      summary: "Could not complete full analysis. Please stay vigilant.",
      detailedReasons: ["AI analysis failed naturally or due to network."],
      score: 50
    };
  }
}

export async function askEducationBot(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: `You are the SafeCrypto AI Tutor for SafeCrypto BD. 
Your goal is to educate users in Bangladesh (and worldwide) about cryptocurrency basics, safety, and investing.
STRICTLY respond only in English. Do not use any other language even if the user asks in another language.
Keep responses concise, educational, and safety-first. 
Always warn about scams when relevant.
Explain terms like 'buy USDT', 'cold wallet', 'P2P' in simple terms.
If asked about a specific project, provide general criteria to evaluate it rather than a definitive "buy/sell" advice if you lack real-time data, but if it looks like a scam, warn them.`,
    },
    // We pass history manually or use the chats.create with history
  });

  // Since we use the raw chat, we send message
  const response = await chat.sendMessage({ message });
  return response.text;
}

export async function getPortfolioAdvice(portfolioData: any) {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this crypto portfolio for risk and provide advice for a user in Bangladesh:
        ${JSON.stringify(portfolioData)}
        
        Provide a JSON response:
        {
          "riskLevel": "Low" | "Medium" | "High",
          "advice": "Summary advice",
          "recommendations": ["action 1", "action 2"],
          "rebalanceSuggestion": "Specific change suggestion"
        }
        `
    });
    return JSON.parse(response.text || "{}");
}
