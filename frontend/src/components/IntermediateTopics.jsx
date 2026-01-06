import React from 'react';
import { useNavigate } from 'react-router-dom';

function IntermediateTopics() {
  const navigate = useNavigate();

  const topics = [
    {
      id: 1,
      title: 'Mathematics and Numbers',
      description: 'Advanced mathematical operations and number theory concepts for programming.',
      icon: '🔢',
      questions: 10,
      level: 'Intermediate'
    },
    {
      id: 2,
      title: 'String Manipulations',
      description: 'Complex string operations including pattern matching and text processing.',
      icon: '📝',
      questions: 10,
      level: 'Intermediate'
    },
    {
      id: 3,
      title: 'Arrays and Lists',
      description: 'Advanced array operations, multi-dimensional arrays, and list comprehensions.',
      icon: '📋',
      questions: 10,
      level: 'Intermediate'
    },
    {
      id: 4,
      title: 'Logic Thinking and Patterns',
      description: 'Develop logical thinking skills through pattern recognition and problem-solving.',
      icon: '🧩',
      questions: 10,
      level: 'Intermediate'
    },
    {
      id: 5,
      title: 'Data Structures',
      description: 'Understanding and implementing fundamental data structures like stacks, queues, and trees.',
      icon: '🏗️',
      questions: 10,
      level: 'Intermediate'
    },
    {
      id: 6,
      title: 'Advanced Applications',
      description: 'Apply programming concepts to solve real-world problems and build applications.',
      icon: '⚙️',
      questions: 10,
      level: 'Intermediate'
    }
  ];

  const handleBack = () => {
    navigate('/difficulty-levels');
  };

  const handleTopicClick = (topic) => {
    // Navigate to the questions for the selected topic
    navigate(`/coding/intermediate/${topic.title.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="intermediate-topics-container">
      <div className="intermediate-topics-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h1>Intermediate Topics</h1>
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

export default IntermediateTopics;