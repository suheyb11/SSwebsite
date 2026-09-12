import React from 'react';

const BlogSocialMediaShare = ({ blogUrl, title, description }) => {
  const handleShare = (platform) => {
    let url = '';
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(blogUrl)}&title=${encodeURIComponent(title)}`;
        break;
      default:
        return;
    }
    
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="blog_details_dtn_icon">
      <a href="#" onClick={(e) => { e.preventDefault(); handleShare('facebook'); }}>
        <i className="fa fa-facebook" />
      </a>
      <a href="#" onClick={(e) => { e.preventDefault(); handleShare('twitter'); }}>
        <i className="fa fa-twitter" />
      </a>
      <a href="#" onClick={(e) => { e.preventDefault(); handleShare('linkedin'); }}>
        <i className="fa fa-linkedin" />
      </a>
    </div>
  );
};

export default BlogSocialMediaShare;