import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdvancedTopics() {
  const navigate = useNavigate();

  const topics = [
    {
      id: 1,
      title: 'Algorithms and Complexity',
      description: 'Deep dive into algorithm design, analysis, and computational complexity.',
      icon: '🧮',
      questions: 10,
      level: 'Advanced'
    },
    {
      id: 2,
      title: 'Advanced Data Structures',
      description: 'Complex data structures including graphs, heaps, and self-balancing trees.',
      icon: '🌐',
      questions: 10,
      level: 'Advanced'
    },
    {
      id: 3,
      title: 'Dynamic Programming',
      description: 'Master dynamic programming techniques to solve optimization problems.',
      icon: '🔄',
      questions: 10,
      level: 'Advanced'
    },
    {
      id: 4,
      title: 'System Design',
      description: 'Learn to design scalable and robust systems architecture.',
      icon: '🏛️',
      questions: 10,
      level: 'Advanced'
    },
    {
      id: 5,
      title: 'Concurrency and Parallelism',
      description: 'Understand concurrent programming, threads, and parallel processing.',
      icon: '⚡',
      questions: 10,
      level: 'Advanced'
    },
    {
      id: 6,
      title: 'Machine Learning Basics',
      description: 'Introduction to machine learning concepts and algorithms.',
      icon: '🤖',
      questions: 10,
      level: 'Advanced'
    }
  ];

  const handleBack = () => {
    navigate('/difficulty-levels');
  };

  const handleTopicClick = (topic) => {
    // Navigate to the questions for the selected topic
    navigate(`/coding/advanced/${topic.title.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="advanced-topics-container">
      <div className="advanced-topics-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h1>Advanced Topics</h1>
      </div>
      
      <div className="topics-grid">
        {topics.map(topic => (
          <div 
            key={topic.id} 
            className="topic-card"
            onClick={() => handleTopicClick(topic)}
          >
            <div className="topic-icon">
              {topic.icon}
            </div>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
            <div className="topic-info">
              <span className="topic-questions">{topic.questions} Questions</span>
              <span className="topic-level">{topic.level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdvancedTopics;