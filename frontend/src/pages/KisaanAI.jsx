import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function KisaanAI() {
  const [question, setQuestion] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const askBlack = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setReply('');

    try {
      const res = await fetch('http://localhost:5000/black/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question })
      });

      const data = await res.json();
      setReply(data.reply);
    } catch (err) {
      setReply('❌ Something went wrong. Please try again later.');
      console.error(err);
    }

    setLoading(false);
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
          placeholder="Ask about a crop, e.g. 'What is the price of wheat?'"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={askBlack}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? '⏳ Fetching...' : '🚜 Ask'}
        </button>

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

    // Detect full section headers like "Punjab:" or "NCT of Delhi..."
    const isHeader = /^[A-Z].+:$/.test(trimmed);

    // Detect important notes or bold markdown
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
