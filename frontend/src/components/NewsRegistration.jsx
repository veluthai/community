import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../App';

function NewsRegistration() {
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
      registrationDeadline: '2023-11-10',
      location: 'Main Auditorium'
    },
    {
      id: 2,
      title: 'Web Development Workshop',
      category: 'Workshop',
      date: '2023-11-20',
      registrationDeadline: '2023-11-18',
      location: 'Lab 301'
    },
    {
      id: 3,
      title: 'Coding Competition',
      category: 'Competition',
      date: '2023-11-25',
      registrationDeadline: '2023-11-22',
      location: 'Computer Lab'
    },
    {
      id: 4,
      title: 'Cloud Computing Seminar',
      category: 'Seminar',
      date: '2023-12-05',
      registrationDeadline: '2023-12-01',
      location: 'Conference Hall'
    },
    {
      id: 5,
      title: 'Android App Development',
      category: 'Workshop',
      date: '2023-12-10',
      registrationDeadline: '2023-12-07',
      location: 'Mobile Lab'
    },
    {
      id: 6,
      title: 'Data Science Symposium',
      category: 'Symposium',
      date: '2023-12-15',
      registrationDeadline: '2023-12-12',
      location: 'Main Auditorium'
    }
  ];

  // Find the news item with the matching ID
  const newsItem = newsItems.find(item => item.id === parseInt(newsId));

  // Form state
  const [formData, setFormData] = useState({
    name: user?.username || '',
    email: user?.email || '',
    phone: '',
    department: '',
    year: '',
    rollNumber: '',
    experience: '',
    expectations: '',
    teamMembers: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  if (!newsItem) {
    return (
      <div className="game-interface-container">
        <div className="game-interface-header">
          <button className="back-button" onClick={() => navigate('/tech-news')}>← Back</button>
          <h1>Event Not Found</h1>
        </div>
        <div className="game-start-screen">
          <p>Sorry, the event you're looking for is not available.</p>
          <button className="start-game-btn" onClick={() => navigate('/tech-news')}>Back to Events</button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate(`/tech-news/${newsId}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.year.trim()) newErrors.year = 'Year is required';
    if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setRegistrationSuccess(true);
      }, 1500);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="game-interface-container">
        <div className="game-interface-header">
          <button className="back-button" onClick={() => navigate('/tech-news')}>← Back</button>
          <h1>Registration Successful</h1>
        </div>
        <div className="registration-success-container">
          <div className="success-icon">✓</div>
          <h2>Thank You for Registering!</h2>
          <p>You have successfully registered for {newsItem.title}.</p>
          <p>A confirmation email has been sent to {formData.email}.</p>
          <div className="registration-details">
            <h3>Event Details:</h3>
            <p><strong>Event:</strong> {newsItem.title}</p>
            <p><strong>Date:</strong> {newsItem.date}</p>
            <p><strong>Location:</strong> {newsItem.location}</p>
          </div>
          <div className="registration-actions">
            <button className="back-to-events-btn" onClick={() => navigate('/tech-news')}>
              Back to Events
            </button>
            <button className="view-details-btn" onClick={() => navigate(`/tech-news/${newsId}`)}>
              View Event Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <div className="registration-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h1>Event Registration</h1>
      </div>
      
      <div className="registration-content">
        <div className="event-summary">
          <h2>{newsItem.title}</h2>
          <div className="event-meta">
            <span className="event-date">Date: {newsItem.date}</span>
            <span className="event-location">Location: {newsItem.location}</span>
            <span className="event-deadline">Registration Deadline: {newsItem.registrationDeadline}</span>
          </div>
        </div>
        
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={errors.department ? 'error' : ''}
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics and Communication">Electronics and Communication</option>
                  <option value="Electrical and Electronics">Electrical and Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                  <option value="Other">Other</option>
                </select>
                {errors.department && <span className="error-message">{errors.department}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="year">Year of Study *</label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={errors.year ? 'error' : ''}
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
                {errors.year && <span className="error-message">{errors.year}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="rollNumber">Roll Number *</label>
                <input
                  type="text"
                  id="rollNumber"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  className={errors.rollNumber ? 'error' : ''}
                />
                {errors.rollNumber && <span className="error-message">{errors.rollNumber}</span>}
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3>Additional Information</h3>
            <div className="form-group">
              <label htmlFor="experience">Previous Experience (if any)</label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows="3"
                placeholder="Tell us about any previous experience related to this event"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="expectations">What do you expect to learn from this event?</label>
              <textarea
                id="expectations"
                name="expectations"
                value={formData.expectations}
                onChange={handleChange}
                rows="3"
                placeholder="Share your expectations from this event"
              ></textarea>
            </div>
            
            {newsItem.category === 'Hackathon' && (
              <div className="form-group">
                <label htmlFor="teamMembers">Team Members (if already have a team)</label>
                <textarea
                  id="teamMembers"
                  name="teamMembers"
                  value={formData.teamMembers}
                  onChange={handleChange}
                  rows="2"
                  placeholder="List your team members' names and roll numbers"
                ></textarea>
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleBack}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewsRegistration;