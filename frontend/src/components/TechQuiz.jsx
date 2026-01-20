import React from 'react';
import { useNavigate } from 'react-router-dom';

function TechQuiz() {
  const navigate = useNavigate();

  const quizTopics = [
    {
      id: 1,
      title: 'Web Development',
      icon: '🌐',
      description: 'Test your knowledge of HTML, CSS, and JavaScript',
      questions: 15
    },
    {
      id: 2,
      title: 'React',
      icon: '⚛️',
      description: 'Challenge yourself with React concepts and best practices',
      questions: 20
    },
    {
      id: 3,
      title: 'Node.js',
      icon: '🟢',
      description: 'Questions about server-side JavaScript with Node.js',
      questions: 18
    },
    {
      id: 4,
      title: 'Database',
      icon: '🗄️',
      description: 'Test your knowledge of SQL and NoSQL databases',
      questions: 12
    },
    {
      id: 5,
      title: 'Python',
      icon: '🐍',
      description: 'Python programming concepts and libraries',
      questions: 25
    },
    {
      id: 6,
      title: 'Machine Learning',
      icon: '🤖',
      description: 'Fundamentals of machine learning and AI',
      questions: 22
    },
    {
      id: 7,
      title: 'Cloud Computing',
      icon: '☁️',
      description: 'AWS, Azure, and Google Cloud platform concepts',
      questions: 16
    },
    {
      id: 8,
      title: 'DevOps',
      icon: '🔧',
      description: 'CI/CD, Docker, Kubernetes, and more',
      questions: 14
    },
    {
      id: 9,
      title: 'Cybersecurity',
      icon: '🔒',
      description: 'Security best practices and common vulnerabilities',
      questions: 19
    }
  ];

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleQuizClick = (topic) => {
    // Navigate to the quiz interface for the selected topic
    navigate(`/tech-quiz/${topic.title.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="tech-quiz-container">
      <div className="tech-quiz-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h1>Tech Quiz</h1>
        <p>Test your knowledge on various technology topics</p>
      </div>
      
      <div className="quiz-topics-grid">
        {quizTopics.map(topic => (
          <div 
            key={topic.id} 
            className="quiz-topic-card"
            onClick={() => handleQuizClick(topic)}
          >
            <div className="quiz-topic-icon">
              {topic.icon}
            </div>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
            <div className="quiz-topic-info">
              <span className="quiz-topic-questions">{topic.questions} Questions</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechQuiz;