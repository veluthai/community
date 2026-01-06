import React from 'react';
import { useNavigate } from 'react-router-dom';

function BeginnerTopics() {
  const navigate = useNavigate();

  const topics = [
    {
      id: 1,
      title: 'Basic Programming',
      description: 'Learn the fundamentals of programming including variables, data types, and basic syntax.',
      icon: '💻',
      questions: 10,
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'Arithmetic Operations',
      description: 'Master basic arithmetic operations and mathematical expressions in programming.',
      icon: '🔢',
      questions: 10,
      level: 'Beginner'
    },
    {
      id: 3,
      title: 'String Manipulation',
      description: 'Learn how to work with strings, including concatenation, slicing, and formatting.',
      icon: '📝',
      questions: 10,
      level: 'Beginner'
    },
    {
      id: 4,
      title: 'Array and List',
      description: 'Understand how to create, access, and manipulate arrays and lists in programming.',
      icon: '📋',
      questions: 10,
      level: 'Beginner'
    },
    {
      id: 5,
      title: 'Control Flow and Logic',
      description: 'Learn about conditional statements, loops, and logical operators in programming.',
      icon: '🔄',
      questions: 10,
      level: 'Beginner'
    }
  ];

  const handleBack = () => {
    navigate('/difficulty-levels');
  };

  const handleTopicClick = (topic) => {
    // Navigate to the questions for the selected topic
    navigate(`/coding/beginner/${topic.title.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="beginner-topics-container">
      <div className="beginner-topics-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h1>Beginner Topics</h1>
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

export default BeginnerTopics;