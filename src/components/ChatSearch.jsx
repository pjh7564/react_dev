// src/components/ChatSearch.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './ChatSearch.css'; // 추가: 스타일 파일

function ChatSearch() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResult('');

    try {
      const res = await axios.post(`${API_URL}/api/search`, { query });
      setResult(res.data.result);
    } catch (error) {
      setResult('❌ 오류가 발생했습니다: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-search-container">
      <h2 className="chat-search-title">💬 ChatGPT 검색</h2>
      <div className="chat-search-input-group">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="예: React란 무엇인가요?"
          className="chat-search-input"
        />
        <button onClick={handleSearch} disabled={loading} className="chat-search-button">
          {loading ? '검색 중...' : '검색'}
        </button>
      </div>
      {result && (
        <div className="chat-search-result">
          <strong>🔍 결과:</strong>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default ChatSearch;
