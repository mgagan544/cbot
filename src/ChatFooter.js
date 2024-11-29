import React, { useState, useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyBKXHUs5Qoq6QC9Ph82wNRVoCkj00kafJM");
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are Ceperia, a friendly assistant who works for TVS Motors. TVS Motors is an automobile company that produces bikes, scooters, mopeds, etc. Your job is to capture the information (name, email, and contact number) of a customer and help them choose their desired vehicle. Provide responses in a small and concise format.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

function ChatFooter({ addMessage }) {
  const [input, setInput] = useState("");
  const [chatSession, setChatSession] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Initialize chat session once when component mounts
    const session = model.startChat({ generationConfig });
    setChatSession(session);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    // Add user message to history
    const userMessage = { role: "user", parts: [{ text: input }] };
    setHistory((prev) => [...prev, userMessage]);

    addMessage("user", input);

    try {
      // Send the updated history to the chat session
      const result = await chatSession.sendMessage(input, { history });
      const botReply = result.response.text();

      // Add bot response to history
      const botMessage = { role: "model", parts: [{ text: botReply }] };
      setHistory((prev) => [...prev, botMessage]);

      addMessage("bot", botReply);
    } catch (error) {
      addMessage("bot", "Error connecting to AI API.");
      console.error("Error:", error);
    }

    setInput("");
  };

  const handleAudioBlob = (blob) => {
    console.log("BLOB", blob)
    if (blob) {
      const audioUrl = URL.createObjectURL(blob);
      addMessage("audio", audioUrl); // Add the audio message with the generated URL
    }
  };

  return (
  <footer className="chat-footer">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
      {/* <ReactMediaRecorder
        audio
        blobPropertyBag={{ type: "audio/webm" }} // Set audio format explicitly
        render={({
          status,
          startRecording,
          stopRecording,
          mediaBlobUrl,
          previewStream,
          clearBlob,
          mediaBlob,
        }) => (
          <div>
            <button onClick={startRecording} disabled={status === "recording"}>
              🎙️ Start Recording
            </button>
            <button
              onClick={() => {
                stopRecording();
                setTimeout(() => {
                    console.log("mediab", mediaBlob)
                  if (mediaBlob) {
                    handleAudioBlob(mediaBlob); // Pass blob directly
                  }
                }, 500);
              }}
              disabled={status !== "recording"}
            >
              Stop Recording
            </button>
          </div>
        )}
      /> */}
    </footer>
  );
}

export default ChatFooter;
