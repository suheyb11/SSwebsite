import React from 'react'
import BlogSocialMediaShare from './BlogSocialMediaShare';
import Image from 'next/image';
export default function BlogDetailCard({ blog }) {
  // Check if blog data exists
  if (!blog || !blog.data) {
    return (
      <div className="col-lg-8 col-md-7 col-sm-12 col-xs-12">
        <div className="blog-details-content">
          <div className="alert alert-warning">Blog post not found</div>
        </div>
      </div>
    );
  }

  const blogData = blog.data;
  
  // Get current URL for sharing
  let blogUrl = '';
  if (typeof window !== 'undefined') {
    blogUrl = window.location.href;
  }

  // Format the description from Strapi rich text
  const formatDescription = (description) => {
    if (!description || !Array.isArray(description)) return '';
    
    return description.map((item, index) => {
      if (item.type === 'paragraph' && item.children) {
        return item.children.map((child, childIndex) => (
          <p key={`${index}-${childIndex}`} style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            {child.text}
          </p>
        ));
      }
      return null;
    });
  };

  return (
    <div className="col-lg-8 col-md-7 col-sm-12 col-xs-12">
      <div className="blog-details-content">
        <div className="single-blog blog-details">
          <div className="blog-content">
            <h2 className="blog-title">{blogData.Title || 'Untitled Blog Post'}</h2>
            <div className="blog-meta">
              <span className="admin">
                <i className="fa fa-user-o" /> Admin
              </span>
              <span className="date">
                <i className="fa fa-calendar" /> 
                {blogData.postedDate 
                  ? new Date(blogData.postedDate).toLocaleDateString()
                  : new Date(blogData.publishedAt).toLocaleDateString()
                }
              </span>
            </div>
            
            {blogData.img && blogData.img.url && (
              <div className="blog-thumb">
                <Image 
                  src={`http://10.97.1.17:1337${blogData.img.url}`} 
                  alt={blogData.Title || 'Blog image'}
                  style={{ 
                    maxWidth: '100%', 
                    height: 'auto',
                    borderRadius: '8px',
                    marginBottom: '20px'
                  }}
                />
              </div>
            )}
            
            <div className="blog-desc" style={{ lineHeight: '1.8', fontSize: '16px' }}>
              {blogData.Description ? (
                <div>{formatDescription(blogData.Description)}</div>
              ) : (
                <p>No content available</p>
              )}
            </div>
            
            <div className="blog-share-area">
              <div className="row">
                <div className="col-md-8">
                  <div className="blog-tag">
                    <span>Categories: </span>
                    {blogData.categories && blogData.categories.length > 0 ? (
                      blogData.categories.map((category, index) => (
                        <a key={index} href="#" style={{ marginLeft: '5px' }}>
                          #{category.name}
                        </a>
                      ))
                    ) : (
                      <span>Uncategorized</span>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <BlogSocialMediaShare 
                    blogUrl={blogUrl}
                    title={blogData.Title}
                    description={blogData.Description ? blogData.Description[0]?.children[0]?.text : ''}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}