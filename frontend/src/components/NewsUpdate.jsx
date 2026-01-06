import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../App';

function NewsUpdate() {
  const navigate = useNavigate();
  const { newsId } = useParams();
  const { user } = useAuth();
  
  // Check if user is staff
  const isStaff = user && (user.email.includes('staff') || user.email.includes('admin') || user.type === 'professional');
  
  // Sample news data (in a real app, this would come from an API)
  const newsItems = [
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
      organizer: 'Computer Science Department',
      fullDescription: 'Join us for an exciting 48-hour hackathon focused on artificial intelligence and machine learning.',
      agenda: [
        'Day 1: Kick-off, team formation, and ideation',
        'Day 2: Development and mentoring sessions',
        'Day 3: Final presentations and awards ceremony'
      ],
      prizes: [
        'First Prize: $1000 + internship opportunities',
        'Second Prize: $500',
        'Third Prize: $250'
      ]
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
      organizer: 'IT Department',
      fullDescription: 'This intensive workshop covers modern web development technologies including React, Node.js, and MongoDB.'
    }
  ];

  // Determine if we're editing an existing news item or creating a new one
  const isEditing = newsId !== undefined;
  const existingNews = isEditing ? newsItems.find(item => item.id === parseInt(newsId)) : null;
  
  // Form state
  const [formData, setFormData] = useState({
    title: existingNews?.title || '',
    category: existingNews?.category || 'Hackathon',
    date: existingNews?.date || '',
    description: existingNews?.description || '',
    fullDescription: existingNews?.fullDescription || '',
    image: existingNews?.image || '',
    registrationOpen: existingNews?.registrationOpen !== undefined ? existingNews.registrationOpen : true,
    registrationDeadline: existingNews?.registrationDeadline || '',
    location: existingNews?.location || '',
    organizer: existingNews?.organizer || '',
    agenda: existingNews?.agenda ? existingNews.agenda.join('\n') : '',
    prizes: existingNews?.prizes ? existingNews.prizes.join('\n') : ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  if (!isStaff) {
    return (
      <div className="game-interface-container">
        <div className="game-interface-header">
          <button className="back-button" onClick={() => navigate('/tech-news')}>← Back</button>
          <h1>Access Denied</h1>
        </div>
        <div className="game-start-screen">
          <p>Sorry, you don't have permission to access this page.</p>
          <button className="start-game-btn" onClick={() => navigate('/tech-news')}>Back to News</button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/tech-news');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
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
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.date.trim()) newErrors.date = 'Date is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.organizer.trim()) newErrors.organizer = 'Organizer is required';
    if (formData.registrationOpen && !formData.registrationDeadline.trim()) {
      newErrors.registrationDeadline = 'Registration deadline is required when registration is open';
    }
    
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
        setUpdateSuccess(true);
      }, 1500);
    }
  };

  if (updateSuccess) {
    return (
      <div className="game-interface-container">
        <div className="game-interface-header">
          <button className="back-button" onClick={() => navigate('/tech-news')}>← Back</button>
          <h1>{isEditing ? 'Update Successful' : 'News Created'}</h1>
        </div>
        <div className="registration-success-container">
          <div className="success-icon">✓</div>
          <h2>{isEditing ? 'News Updated Successfully!' : 'News Created Successfully!'}</h2>
          <p>The news item "{formData.title}" has been {isEditing ? 'updated' : 'created'}.</p>
          <div className="registration-actions">
            <button className="back-to-events-btn" onClick={() => navigate('/tech-news')}>
              Back to News
            </button>
            <button className="view-details-btn" onClick={() => navigate(`/tech-news/${isEditing ? newsId : 'new'}`)}>
              View News Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-update-container">
      <div className="news-update-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h1>{isEditing ? 'Update News' : 'Create News'}</h1>
      </div>
      
      <form className="news-update-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Hackathon">Hackathon</option>
                <option value="Workshop">Workshop</option>
                <option value="Competition">Competition</option>
                <option value="Seminar">Seminar</option>
                <option value="Symposium">Symposium</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Event Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={errors.date ? 'error' : ''}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={errors.location ? 'error' : ''}
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="organizer">Organizer *</label>
              <input
                type="text"
                id="organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                className={errors.organizer ? 'error' : ''}
              />
              {errors.organizer && <span className="error-message">{errors.organizer}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3>Description</h3>
          <div className="form-group">
            <label htmlFor="description">Short Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className={errors.description ? 'error' : ''}
            ></textarea>
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="fullDescription">Full Description</label>
            <textarea
              id="fullDescription"
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              rows="5"
            ></textarea>
          </div>
        </div>
        
        <div className="form-section">
          <h3>Registration</h3>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="registrationOpen"
              name="registrationOpen"
              checked={formData.registrationOpen}
              onChange={handleChange}
            />
            <label htmlFor="registrationOpen">Registration Open</label>
          </div>
          
          {formData.registrationOpen && (
            <div className="form-group">
              <label htmlFor="registrationDeadline">Registration Deadline *</label>
              <input
                type="date"
                id="registrationDeadline"
                name="registrationDeadline"
                value={formData.registrationDeadline}
                onChange={handleChange}
                className={errors.registrationDeadline ? 'error' : ''}
              />
              {errors.registrationDeadline && <span className="error-message">{errors.registrationDeadline}</span>}
            </div>
          )}
        </div>
        
        {(formData.category === 'Hackathon' || formData.category === 'Workshop' || formData.category === 'Competition') && (
          <div className="form-section">
            <h3>Additional Details</h3>
            
            {(formData.category === 'Hackathon' || formData.category === 'Competition') && (
              <div className="form-group">
                <label htmlFor="prizes">Prizes (one per line)</label>
                <textarea
                  id="prizes"
                  name="prizes"
                  value={formData.prizes}
                  onChange={handleChange}
                  rows="4"
                  placeholder="First Prize: $1000&#10;Second Prize: $500&#10;Third Prize: $250"
                ></textarea>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="agenda">Agenda (one item per line)</label>
              <textarea
                id="agenda"
                name="agenda"
                value={formData.agenda}
                onChange={handleChange}
                rows="4"
                placeholder="Day 1: Kick-off and team formation&#10;Day 2: Development&#10;Day 3: Presentations"
              ></textarea>
            </div>
          </div>
        )}
        
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleBack}>
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (isEditing ? 'Update News' : 'Create News')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewsUpdate;