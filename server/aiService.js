/**
 * AI SERVICE FOR REALITY ENGINE
 * 
 * Supports Gemini API if GEMINI_API_KEY is configured in environment,
 * but seamlessly and reliably falls back to childLogicParser.js.
 */

const { analyzeChildRequest } = require('./childLogicParser');

async function interpretRequest(userPrompt) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Zero external dependency mode - instant, robust, and sincere
    return analyzeChildRequest(userPrompt);
  }

  try {
    const prompt = `You are the Reality Alteration Bureau from "ENIKK INNALE THINNANAM - Where Goo Goo Gaa Comes to Life".
A child has made this request: "${userPrompt}".

Your job is NOT to make fun of the child or say it is impossible.
You must take it LITERALLY and with deadpan sincerity.
Respond ONLY with a JSON object matching this structure:
{
  "archetype": "one of: 'yesterday_biriyani', 'moon', 'cloud', 'dinosaur', 'rainbow', 'flying_elephant', 'pocket_sun', 'giant_character', 'living_drawing', or 'procedural'",
  "object": "short name of the object",
  "action": "action to perform",
  "size": "tiny / normal / giant / colossal / pocket-sized",
  "location": "location mentioned or implied",
  "temporal": "now / yesterday / future",
  "physicalPossibility": "e.g. 0.0001% or 0%",
  "temporalLogic": "if applicable, e.g. Uncooperative, or null",
  "completionSummary": "short deadpan confirmation of completion",
  "sideEffect": "harmless, whimsical side effect or null",
  "behaviors": ["array of behaviors like float, wobble, draggable, followCursor, fly, stomp, rain"]
}`;

    // Simple fetch call to Gemini 2.5 flash / 1.5 flash REST API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    });

    if (!response.ok) {
      console.warn(`Gemini API returned ${response.status}. Using local child logic parser.`);
      return analyzeChildRequest(userPrompt);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return analyzeChildRequest(userPrompt);
    }

    const parsed = JSON.parse(rawText);
    
    // Supplement with standard bureaucratic logs
    const bureaucraticLog = [
      'REQUEST RECEIVED',
      'ANALYZING CHILD LOGIC...',
      `OBJECT: ${(parsed.object || 'OBJECT').toUpperCase()}`,
      `ACTION: ${(parsed.action || 'ACTION').toUpperCase()}`,
      `SCALE: ${(parsed.size || 'NORMAL').toUpperCase()}`,
      `PHYSICAL POSSIBILITY: ${parsed.physicalPossibility || '0.0001%'}`
    ];

    if (parsed.temporalLogic) {
      bureaucraticLog.push(`TEMPORAL LOGIC: ${parsed.temporalLogic}`);
    }

    bureaucraticLog.push('DECISION: Okay.');
    bureaucraticLog.push('INITIATING REALITY ALTERATION...');

    return {
      success: true,
      input: userPrompt,
      archetype: parsed.archetype || 'procedural',
      object: parsed.object || 'object',
      action: parsed.action || 'appear',
      size: parsed.size || 'normal',
      location: parsed.location || 'room',
      temporal: parsed.temporal || 'now',
      physicalPossibility: parsed.physicalPossibility || '0.0001%',
      temporalLogic: parsed.temporalLogic || null,
      bureaucraticLog,
      completionSummary: parsed.completionSummary || 'Reality alteration completed.',
      sideEffect: parsed.sideEffect || null,
      behaviors: Array.isArray(parsed.behaviors) ? parsed.behaviors : ['float', 'wobble', 'draggable', 'followCursor'],
      visualConfig: {
        color: '#FF7675',
        secondaryColor: '#74B9FF',
        label: parsed.object || 'Impossible Thing',
        archetype: parsed.archetype || 'procedural',
        size: parsed.size || 'normal'
      }
    };
  } catch (err) {
    console.warn('AI Service error, falling back to local child logic engine:', err.message);
    return analyzeChildRequest(userPrompt);
  }
}

module.exports = {
  interpretRequest
};
