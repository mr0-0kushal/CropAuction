import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function KisaanAI() {
  const [question, setQuestion] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognitionInstance;

  if (recognition) {
    recognitionInstance = new recognition();
    recognitionInstance.lang = 'hi-IN'; // Hindi
    recognitionInstance.interimResults = false;
    recognitionInstance.continuous = false;

    recognitionInstance.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setQuestion(spokenText);
      askBlack(spokenText);
      setIsListening(false);
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };
  }

  const askBlack = async (query = question) => {
    if (!query.trim()) return;
    setLoading(true);
    setReply('');

    try {
      const res = await fetch('http://localhost:5000/black/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: query })
      });

      const data = await res.json();
      setReply(data.reply);
    } catch (err) {
      setReply('❌ Something went wrong. Please try again later.');
      console.error(err);
    }

    setLoading(false);
  };

  const toggleVoiceInput = () => {
    if (!recognitionInstance) return alert('Your browser does not support speech recognition.');

    if (!isListening) {
      setIsListening(true);
      recognitionInstance.start();
    } else {
      recognitionInstance.stop();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white shadow-2xl rounded-2xl p-6 max-w-xl w-full"
      >
        <h1 className="text-3xl font-extrabold mb-4 text-green-700 tracking-tight">
          🌾 Kisaan AI – Crop Price Assistant
        </h1>

        <textarea
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          rows="3"
          placeholder="Ask about a crop, e.g. 'गेहूं का दाम क्या है?'"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <div className="flex gap-2 mb-4">
        <button
  onClick={() => askBlack()} // explicitly call it without event
  disabled={loading}
  className="flex-1 bg-green-600 text-white py-2 font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
>
  {loading ? '⏳ Fetching...' : '🚜 Ask'}
</button>


          <button
            onClick={toggleVoiceInput}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${
              isListening ? 'bg-red-100 border-red-400 text-red-600' : 'bg-blue-100 border-blue-400 text-blue-600'
            }`}
          >
            🎙️ {isListening ? 'Listening...' : 'Speak'}
          </button>
        </div>

        {reply && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6"
          >
            <h2 className="font-semibold text-lg text-green-700 mb-2">🧠 Black's Reply:</h2>
            <div className="bg-gray-100 p-4 rounded-lg text-gray-800 space-y-2 leading-relaxed">
              {reply.split('\n').map((line, index) => {
                const trimmed = line.trim();
                const isHeader = /^[A-Z].+:$/.test(trimmed);
                const boldPattern = /\*\*(.*?)\*\*/g;
                const formattedLine = trimmed.replace(boldPattern, (_, boldText) => `<strong>${boldText}</strong>`);
                return (
                  <div key={index}>
                    {isHeader ? (
                      <p className="font-bold text-green-700">{trimmed}</p>
                    ) : (
                      <p
                        className={`pl-4 ${trimmed.startsWith('•') ? '' : 'text-sm text-gray-700'}`}
                        dangerouslySetInnerHTML={{ __html: formattedLine }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
