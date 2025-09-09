import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 })
    }

    // Build conversation context
    let conversationContext =
      "You are SafeTravel AI, a helpful assistant for tourist safety. You provide information about travel safety, emergency procedures, and general travel advice. Keep responses concise and helpful.\n\n"

    if (history && history.length > 0) {
      conversationContext += "Previous conversation:\n"
      history.forEach((msg: any) => {
        conversationContext += `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.content}\n`
      })
      conversationContext += "\n"
    }

    conversationContext += `User: ${message}\nAssistant:`

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: conversationContext,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Gemini API error:", errorData)
      return NextResponse.json({ error: "Failed to get response from Gemini" }, { status: 500 })
    }

    const data = await response.json()

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      return NextResponse.json({ error: "Invalid response from Gemini" }, { status: 500 })
    }

    const botResponse = data.candidates[0].content.parts[0].text

    return NextResponse.json({ response: botResponse })
  } catch (error) {
    console.error("Error in Gemini API route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
