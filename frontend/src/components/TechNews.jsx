import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App'; // Import the useAuth hook

function TechNews() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the current user from auth context
  
  // Sample news data
  const [newsItems, setNewsItems] = useState([
    {
      id: 1,
      title: 'AI Hackathon 2023',
      category: 'Hackathon',
      date: '2023-11-15',
      description: 'Join us for a 48-hour hackathon focused on artificial intelligence and machine learning.',
      image: 'https://picsum.photos/seed/ai-hackathon/400/250.jpg',
      registrationOpen: true,
      registrationDeadline: '2023-11-10',
      location: 'Main Auditorium',
      organizer: 'Computer Science Department'
    },
    {
      id: 2,
      title: 'Web Development Workshop',
      category: 'Workshop',
      date: '2023-11-20',
      description: 'Learn the latest web development technologies including React, Node.js, and MongoDB.',
      image: 'https://picsum.photos/seed/web-dev/400/250.jpg',
      registrationOpen: true,
      registrationDeadline: '2023-11-18',
      location: 'Lab 301',
      organizer: 'IT Department'
    },
    {
      id: 3,
      title: 'Coding Competition',
      category: 'Competition',
      date: '2023-11-25',
      description: 'Test your coding skills in our annual programming competition with exciting prizes.',
      image: 'https://picsum.photos/seed/coding-comp/400/250.jpg',
      registrationOpen: true,
      registrationDeadline: '2023-11-22',
      location: 'Computer Lab',
      organizer: 'Coding Club'
    },
    {
      id: 4,
      title: 'Cloud Computing Seminar',
      category: 'Seminar',
      date: '2023-12-05',
      description: 'Industry experts will share insights on cloud computing trends and career opportunities.',
      image: 'https://picsum.photos/seed/cloud-seminar/400/250.jpg',
      registrationOpen: true,
      registrationDeadline: '2023-12-01',
      location: 'Conference Hall',
      organizer: 'Computer Science Department'
    },
    {
      id: 5,
      title: 'Android App Development',
      category: 'Workshop',
      date: '2023-12-10',
      description: 'Hands-on workshop on developing Android applications using Kotlin.',
      image: 'https://picsum.photos/seed/android-dev/400/250.jpg',
      registrationOpen: true,
      registrationDeadline: '2023-12-07',
      location: 'Mobile Lab',
      organizer: 'Mobile Development Club'
    },
    {
      id: 6,
      title: 'Data Science Symposium',
      category: 'Symposium',
      date: '2023-12-15',
      description: 'Explore the latest developments in data science and analytics with industry leaders.',
      image: 'https://picsum.photos/seed/data-science/400/250.jpg',
      registrationOpen: true,
      registrationDeadline: '2023-12-12',
      location: 'Main Auditorium',
      organizer: 'Data Science Club'
    }
  ]);

  const [filter, setFilter] = useState('All');

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleNewsClick = (newsItem) => {
    navigate(`/tech-news/${newsItem.id}`);
  };

  const handleRegister = (e, newsItem) => {
    e.stopPropagation(); // Prevent the card click event
    navigate(`/tech-news/register/${newsItem.id}`);
  };

  const handleUpdateNews = () => {
    navigate('/tech-news/update');
  };

  // Filter news items based on selected category
  const filteredNews = filter === 'All' 
    ? newsItems 
    : newsItems.filter(item => item.category === filter);

  // Check if user is staff (for demo purposes, we'll check if email contains "staff" or "admin")
  const isStaff = user && (user.email.includes('staff') || user.email.includes('admin') || user.type === 'professional');

  return (
    <div className="tech-news-container">
      <div className="tech-news-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h1>Tech News & Events</h1>
        <p>Stay updated with the latest technical events and competitions</p>
        {isStaff && (
          <button className="update-news-btn" onClick={handleUpdateNews}>
            Update News
          </button>
        )}
      </div>
      
      <div className="news-filter">
        <button 
          className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'Hackathon' ? 'active' : ''}`}
          onClick={() => setFilter('Hackathon')}
        >
          Hackathon
        </button>
        <button 
          className={`filter-btn ${filter === 'Workshop' ? 'active' : ''}`}
          onClick={() => setFilter('Workshop')}
        >
          Workshop
        </button>
        <button 
          className={`filter-btn ${filter === 'Competition' ? 'active' : ''}`}
          onClick={() => setFilter('Competition')}
        >
          Competition
        </button>
        <button 
          className={`filter-btn ${filter === 'Seminar' ? 'active' : ''}`}
          onClick={() => setFilter('Seminar')}
        >
          Seminar
        </button>
        <button 
          className={`filter-btn ${filter === 'Symposium' ? 'active' : ''}`}
          onClick={() => setFilter('Symposium')}
        >
          Symposium
        </button>
      </div>
      
      <div className="news-grid">
        {filteredNews.map(newsItem => (
          <div 
            key={newsItem.id} 
            className="news-card"
            onClick={() => handleNewsClick(newsItem)}
          >
            <div className="news-image">
              <img src={newsItem.image} alt={newsItem.title} />
              <div className="news-category">{newsItem.category}</div>
            </div>
            <div className="news-content">
              <h3>{newsItem.title}</h3>
              <div className="news-meta">
                <span className="news-date">{newsItem.date}</span>
                <span className="news-location">{newsItem.location}</span>
              </div>
              <p>{newsItem.description}</p>
              <div className="news-footer">
                <span className="news-organizer">By {newsItem.organizer}</span>
                {newsItem.registrationOpen && (
                  <button 
                    className="register-btn" 
                    onClick={(e) => handleRegister(e, newsItem)}
                  >
                    Register Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechNews;