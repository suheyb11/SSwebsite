import React, { useState, useEffect } from 'react';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaBriefcase, FaTimes, FaFrown, FaBuilding } from 'react-icons/fa';
import Layout from '../components/layout/Layout'
import Link from 'next/link';

// Error Boundary Component to catch runtime errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen d-flex align-items-center justify-content-center bg-light">
          <Layout>
            <div className="text-center bg-white p-5 rounded shadow-sm max-w-md">
              <div className="text-warning display-4 mb-4">⚠️</div>
              <h2 className="h3 text-dark mb-3">Something went wrong</h2>
              <p className="text-muted mb-4">Please try refreshing the page</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn btn-warning"
              >
                Reload Page
              </button>
            </div>
          </Layout>
        </div>
      );
    }

    return this.props.children;
  }
}

function JobBoardPageContent() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    department: ''
  });

  useEffect(() => {
    // Handle iOS Safari autofill and other runtime errors
    const handleRuntimeError = (event) => {
      if (event.message && event.message.includes('_AutofillCallbackHandler')) {
        event.preventDefault();
        console.log('Autofill error suppressed');
        return true;
      }
      return false;
    };

    const handleRejection = (event) => {
      if (event.reason && event.reason.message && event.reason.message.includes('_AutofillCallbackHandler')) {
        event.preventDefault();
        console.log('Promise rejection with autofill error suppressed');
        return true;
      }
      return false;
    };

    window.addEventListener('error', handleRuntimeError);
    window.addEventListener('unhandledrejection', handleRejection);
    
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Use relative path to your API route
        const response = await fetch('/api/careers');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setJobs(data.data || []);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load job opportunities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();

    return () => {
      window.removeEventListener('error', handleRuntimeError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  // Get unique locations and departments for filters
  const locations = [...new Set(jobs.map(job => job.location?.name).filter(Boolean))];
  const departments = [...new Set(jobs.map(job => job.department?.name).filter(Boolean))];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.type && job.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.location?.name && job.location.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.department?.name && job.department.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !filters.location || job.location?.name === filters.location;
    const matchesDepartment = !filters.department || job.department?.name === filters.department;
    
    return matchesSearch && matchesLocation && matchesDepartment;
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const handleApplyClick = (job) => {
    // Only allow opening modal for open positions
    if (job.satuation === 'Opened') {
      setSelectedJob(job);
      setShowModal(true);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      department: ''
    });
    setSearchTerm('');
  };

  const renderRichText = (detail) => {
    if (!detail) return null;
    
    try {
      return detail.map((item, index) => {
        switch (item.type) {
          case 'heading':
            const HeadingTag = `h${item.level || 3}`;
            return React.createElement(
              HeadingTag, 
              { key: index, className: `my-3` },
              item.children?.[0]?.text || ''
            );
          case 'paragraph':
            return (
              <p key={index} className="my-2">
                {item.children?.[0]?.text || ''}
              </p>
            );
          default:
            return null;
        }
      });
    } catch (error) {
      console.error('Error rendering rich text:', error);
      return <p>Error loading job details</p>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen d-flex align-items-center justify-content-center bg-light">
        <Layout>
          <div className="text-center">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading job opportunities...</p>
          </div>
        </Layout>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen d-flex align-items-center justify-content-center bg-light">
        <Layout>
          <div className="text-center bg-white p-5 rounded shadow-sm max-w-md">
            <div className="text-danger display-4 mb-4">⚠️</div>
            <h2 className="h3 text-dark mb-3">Error Loading Jobs</h2>
            <p className="text-muted mb-4">{error}</p>
            <p className="text-muted small mb-4">Please check if the API endpoint is accessible</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-warning"
            >
              Try Again
            </button>
          </div>
        </Layout>
      </div>
    );
  }

  return (
    <div className="min-h-screen d-flex flex-column bg-light">
      <Layout>
        <div className="breatcome_area4 d-flex align-items-center" id="prepaid"
          style={{ backgroundImage: "url(/assets/images/slider/airtime.jpg)" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breatcome_title">
                  <div className="breatcome_title_inner pb-2">
                    <h2 style={{ color: "#1f2f5e" }}>Careers</h2>
                  </div>
                  <div className="breatcome_content">
                    <ul>
                      <li>
                        <Link href="/" style={{ color: "#1f2f5e" }}>Home</Link>{" "}
                        <i className="fa fa-angle-right" style={{ color: "#1f2f5e" }}/>{" "}
                        <span style={{ color: "#1f2f5e" }}>Career</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
        
        <div className="container my-5 flex-grow-1">
          <header className="text-center mb-5">
            <h1 className="display-4 fw-bold text-dark mb-3">Somtel Job Opportunities</h1>
            <p className="lead text-muted">Join our team and grow your career with us</p>
          </header>

          {/* Search and Filters */}
          <div className="row mb-5">
            <div className="col-md-8 col-lg-6 mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search jobs by title, type, location, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="col-md-4 col-lg-3 mb-3">
              <select 
                className="form-control"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            <div className="col-md-4 col-lg-3 mb-3">
              <select 
                className="form-control"
                value={filters.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map(department => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
            </div>
            
            {(filters.location || filters.department || searchTerm) && (
              <div className="col-12 text-center">
                <button className="btn btn-sm btn-outline-warning" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          <section>
            {filteredJobs.length === 0 ? (
              <div className="text-center py-5 bg-white rounded shadow-sm">
                <FaFrown className="text-muted display-4 mb-3" />
                <h3 className="h4 text-dark mb-2">No jobs found</h3>
                <p className="text-muted">
                  {searchTerm || filters.location || filters.department 
                    ? `No jobs match your current filters.` 
                    : 'There are currently no job openings.'}
                </p>
                {(searchTerm || filters.location || filters.department) && (
                  <button className="btn btn-warning mt-3" onClick={clearFilters}>
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="row">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 shadow-sm hover-shadow">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h5 className="card-title fw-bold text-dark">{job.title}</h5>
                          <span className={`badge ${job.satuation === 'Opened' ? 'bg-success' : 'bg-danger'}`}>
                            {job.satuation || 'Closed'}
                          </span>
                        </div>
                        
                        <div className="mb-3">
                          <div className="d-flex align-items-center text-muted mb-2">
                            <FaBriefcase className="me-2" />
                            <small>{job.type || 'Full-time'}</small>
                          </div>
                          
                          {job.location?.name && (
                            <div className="d-flex align-items-center text-muted mb-2">
                              <FaMapMarkerAlt className="me-2" />
                              <small>{job.location.name}</small>
                            </div>
                          )}
                          
                          {job.department?.name && (
                            <div className="d-flex align-items-center text-muted mb-2">
                              <FaBuilding className="me-2" />
                              <small>{job.department.name}</small>
                            </div>
                          )}
                          
                          {job.deadline && (
                            <div className="d-flex align-items-center text-muted">
                              <FaCalendarAlt className="me-2" />
                              <small>Apply by: {formatDate(job.deadline)}</small>
                            </div>
                          )}
                        </div>
                        
                        {job.satuation === 'Opened' ? (
                          <button
                            onClick={() => handleApplyClick(job)}
                            className="btn btn-warning w-100 mt-3"
                          >
                            View Details & Apply
                          </button>
                        ) : (
                          <button
                            className="btn btn-secondary w-100 mt-3"
                            disabled
                          >
                            Closed
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </Layout>

      {/* Job Detail Modal */}
      {showModal && selectedJob && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedJob.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-4">
                  {selectedJob.type && (
                    <div className="col-sm-6 mb-2">
                      <div className="d-flex align-items-center text-muted">
                        <FaBriefcase className="me-2" />
                        <span>{selectedJob.type}</span>
                      </div>
                    </div>
                  )}
                  
                  {selectedJob.location?.name && (
                    <div className="col-sm-6 mb-2">
                      <div className="d-flex align-items-center text-muted">
                        <FaMapMarkerAlt className="me-2" />
                        <span>{selectedJob.location.name}</span>
                      </div>
                    </div>
                  )}
                  
                  {selectedJob.department?.name && (
                    <div className="col-sm-6 mb-2">
                      <div className="d-flex align-items-center text-muted">
                        <FaBuilding className="me-2" />
                        <span>{selectedJob.department.name}</span>
                      </div>
                    </div>
                  )}
                  
                  {selectedJob.deadline && (
                    <div className="col-sm-6 mb-2">
                      <div className="d-flex align-items-center text-muted">
                        <FaCalendarAlt className="me-2" />
                        <span>Apply by: {formatDate(selectedJob.deadline)}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="border-top pt-3">
                  {selectedJob.detail && renderRichText(selectedJob.detail)}
                </div>
              </div>
              <div className="modal-footer">
                <a
                  href="mailto:hrm.ss@somtelnetwork.net"
                  className="btn btn-warning"
                >
                  Apply Now
                </a>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main exported component wrapped with Error Boundary
export default function JobBoardPage() {
  return (
    <ErrorBoundary>
      <JobBoardPageContent />
    </ErrorBoundary>
  );
}