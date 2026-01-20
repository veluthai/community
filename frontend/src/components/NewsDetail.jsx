import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../App';

function NewsDetail() {
  const navigate = useNavigate();
  const { newsId } = useParams();
  const { user } = useAuth();
  
  // Sample news data (in a real app, this would come from an API)
  const newsItems = [
    {
      id: 1,
      title: 'AI Hackathon 2023',
      category: 'Hackathon',
      date: '2023-11-15',
      description: 'Join us for a 48-hour hackathon focused on artificial intelligence and machine learning.',
      image: 'https://picsum.photos/seed/ai-hackathon/800/400.jpg',
      registrationOpen: true,
      registrationDeadline: '2023-11-10',
      location: 'Main Auditorium',
      organizer: 'Computer Science Department',
      fullDescription: 'Join us for an exciting 48-hour hackathon focused on artificial intelligence and machine learning. This event brings together students, developers, and AI enthusiasts to create innovative solutions using AI technologies. Teams will work on real-world problems and present their solutions to a panel of industry experts. Winners will receive exciting prizes and opportunities for internships with leading tech companies.',
      agenda: [
        'Day 1: Kick-off, team formation, and ideation',
        'Day 2: Development and mentoring sessions',
        'Day 3: Final presentations and awards ceremony'
      ],
      prizes: [
        'First Prize: $1000 + internship opportunities',
        'Second Prize: $500',
        'Third Prize: $250',
        'Special category winners: $100 each'
      ],
      requirements: 'Basic programming knowledge is required. Teams of 3-4 members are recommended. Bring your own laptop.'
    },
    {
      id: 2,
      title: 'Web Development Workshop',
      category: 'Workshop',
      date: '2023-11-20',
      description: 'Learn the latest web development technologies including React, Node.js, and MongoDB.',
      image: 'https://picsum.photos/seed/web-dev/800/400.jpg',
      registrationOpen: true,
      registrationDeadline: '2023-11-18',
      location: 'Lab 301',
      organizer: 'IT Department',
      fullDescription: 'This intensive workshop covers modern web development technologies including React, Node.js, and MongoDB. Participants will learn how to build full-stack web applications from scratch. The workshop includes hands-on sessions, project work, and guidance from industry experts. By the end of the workshop, participants will have built a complete web application and deployed it to a cloud platform.',
      agenda: [
        'Introduction to modern web development',
        'React fundamentals and components',
        'Building RESTful APIs with Node.js',
        'Database design with MongoDB',
        'Deployment and best practices'
      ],
      prerequisites: 'Basic knowledge of HTML, CSS, and JavaScript is required.',
      certificate: 'Participants will receive a certificate of completion.'
    },
    {
      id: 3,
      title: 'Coding Competition',
      category: 'Competition',
      date: '2023-11-25',
      description: 'Test your coding skills in our annual programming competition with exciting prizes.',
      image: 'https://picsum.photos/seed/coding-comp/800/400.jpg',
      registrationOpen: true,
      registrationDeadline: '2023-11-22',
      location: 'Computer Lab',
      organizer: 'Coding Club',
      fullDescription: 'Test your coding skills in our annual programming competition. This event challenges participants to solve algorithmic problems within a time limit. The competition is open to all students and consists of multiple rounds with increasing difficulty. Top performers will receive exciting prizes and recognition.',
      rules: [
        'Individual participation only',
        'No electronic devices other than the provided computer',
        'Internet access will be restricted',
        'Solutions will be evaluated for correctness and efficiency'
      ],
      prizes: [
        'First Prize: $500 + trophy',
        'Second Prize: $300',
        'Third Prize: $150',
        'Top 10 participants: Certificate of excellence'
      ]
    },
    {
      id: 4,
      title: 'Cloud Computing Seminar',
      category: 'Seminar',
      date: '2023-12-05',
      description: 'Industry experts will share insights on cloud computing trends and career opportunities.',
      image: 'https://picsum.photos/seed/cloud-seminar/800/400.jpg',
      registrationOpen: true,
      registrationDeadline: '2023-12-01',
      location: 'Conference Hall',
      organizer: 'Computer Science Department',
      fullDescription: 'Industry experts from leading cloud service providers will share insights on cloud computing trends, best practices, and career opportunities. The seminar will cover major cloud platforms, emerging technologies, and real-world case studies. Participants will gain valuable knowledge about cloud architecture, security, and implementation strategies.',
      speakers: [
        'John Smith - Cloud Architect at AWS',
        'Jane Doe - Senior Engineer at Google Cloud',
        'Mike Johnson - Azure Specialist at Microsoft'
      ],
      topics: [
        'Cloud computing fundamentals',
        'Major cloud platforms comparison',
        'Cloud security best practices',
        'Career opportunities in cloud computing'
      ]
    },
    {
      id: 5,
      title: 'Android App Development',
      category: 'Workshop',
      date: '2023-12-10',
      description: 'Hands-on workshop on developing Android applications using Kotlin.',
      image: 'https://picsum.photos/seed/android-dev/800/400.jpg',
      registrationOpen: true,
      registrationDeadline: '2023-12-07',
      location: 'Mobile Lab',
      organizer: 'Mobile Development Club',
      fullDescription: 'This hands-on workshop covers Android app development using Kotlin. Participants will learn the fundamentals of Android development, UI design, data storage, and API integration. By the end of the workshop, participants will have built a fully functional Android app and gained the skills to develop their own applications.',
      agenda: [
        'Introduction to Android development and Kotlin',
        'UI design with XML and Jetpack Compose',
        'Data storage with SQLite and Room',
        'API integration and networking',
        'App deployment and publishing'
      ],
      prerequisites: 'Basic programming knowledge is required. Participants should bring their own Android devices for testing.',
      certificate: 'Participants will receive a certificate of completion.'
    },
    {
      id: 6,
      title: 'Data Science Symposium',
      category: 'Symposium',
      date: '2023-12-15',
      description: 'Explore the latest developments in data science and analytics with industry leaders.',
      image: 'https://picsum.photos/seed/data-science/800/400.jpg',
      registrationOpen: true,
      registrationDeadline: '2023-12-12',
      location: 'Main Auditorium',
      organizer: 'Data Science Club',
      fullDescription: 'Explore the latest developments in data science and analytics with industry leaders. This symposium brings together data scientists, researchers, and students to discuss emerging trends, challenges, and opportunities in the field of data science. The event includes keynote speeches, panel discussions, and networking sessions.',
      speakers: [
        'Dr. Sarah Lee - Data Scientist at Netflix',
        'Prof. Michael Chen - MIT Data Science Lab',
        'Rachel Williams - AI Research Lead at OpenAI'
      ],
      topics: [
        'Machine learning in practice',
        'Ethical considerations in data science',
        'Career paths in data science',
        'Future trends in AI and analytics'
      ]
    }
  ];

  // Find the news item with the matching ID
  const newsItem = newsItems.find(item => item.id === parseInt(newsId));

  // Check if user is staff
  const isStaff = user && (user.email.includes('staff') || user.email.includes('admin') || user.type === 'professional');

  if (!newsItem) {
    return (
      <div className="game-interface-container">
        <div className="game-interface-header">
          <button className="back-button" onClick={() => navigate('/tech-news')}>← Back</button>
          <h1>News Not Found</h1>
        </div>
        <div className="game-start-screen">
          <p>Sorry, the news item you're looking for is not available.</p>
          <button className="start-game-btn" onClick={() => navigate('/tech-news')}>Back to News</button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/tech-news');
  };

  const handleRegister = () => {
    navigate(`/tech-news/register/${newsItem.id}`);
  };

  const handleEditNews = () => {
    navigate(`/tech-news/update/${newsItem.id}`);
  };

  return (
    <div className="news-detail-container">
      <div className="news-detail-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h1>{newsItem.title}</h1>
        {isStaff && (
          <button className="edit-news-btn" onClick={handleEditNews}>
            Edit News
          </button>
        )}
      </div>
      
      <div className="news-detail-content">
        <div className="news-detail-image">
          <img src={newsItem.image} alt={newsItem.title} />
        </div>
        
        <div className="news-detail-info">
          <div className="news-detail-meta">
            <span className="news-category">{newsItem.category}</span>
            <span className="news-date">{newsItem.date}</span>
            <span className="news-location">{newsItem.location}</span>
          </div>
          
          <div className="news-detail-description">
            <p>{newsItem.fullDescription || newsItem.description}</p>
          </div>
          
          {newsItem.agenda && (
            <div className="news-section">
              <h3>Agenda</h3>
              <ul>
                {newsItem.agenda.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          
          {newsItem.prizes && (
            <div className="news-section">
              <h3>Prizes</h3>
              <ul>
                {newsItem.prizes.map((prize, index) => (
                  <li key={index}>{prize}</li>
                ))}
              </ul>
            </div>
          )}
          
          {newsItem.speakers && (
            <div className="news-section">
              <h3>Speakers</h3>
              <ul>
                {newsItem.speakers.map((speaker, index) => (
                  <li key={index}>{speaker}</li>
                ))}
              </ul>
            </div>
          )}
          
          {newsItem.topics && (
            <div className="news-section">
              <h3>Topics</h3>
              <ul>
                {newsItem.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
          )}
          
          {newsItem.rules && (
            <div className="news-section">
              <h3>Rules</h3>
              <ul>
                {newsItem.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          )}
          
          {newsItem.prerequisites && (
            <div className="news-section">
              <h3>Prerequisites</h3>
              <p>{newsItem.prerequisites}</p>
            </div>
          )}
          
          {newsItem.requirements && (
            <div className="news-section">
              <h3>Requirements</h3>
              <p>{newsItem.requirements}</p>
            </div>
          )}
          
          {newsItem.certificate && (
            <div className="news-section">
              <h3>Certificate</h3>
              <p>{newsItem.certificate}</p>
            </div>
          )}
          
          <div className="news-detail-footer">
            <div className="news-organizer">
              <span>Organized by: {newsItem.organizer}</span>
            </div>
            
            {newsItem.registrationOpen && (
              <div className="registration-info">
                <p>Registration Deadline: {newsItem.registrationDeadline}</p>
                <button className="register-btn" onClick={handleRegister}>
                  Register Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsDetail;