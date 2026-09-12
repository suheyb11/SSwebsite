import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
function BlogCard({ blogs }) {
  const router = useRouter();
  const page = router.query.page || '1';

  // Safe data access
  if (!blogs || !blogs.data || !Array.isArray(blogs.data)) {
    return (
      <div className="row">
        <div className="col-lg-12">
          <p>No blog posts available.</p>
        </div>
      </div>
    );
  }

  const pageNumbers = blogs.meta?.pagination?.pageCount 
    ? Array.from({ length: blogs.meta.pagination.pageCount }, (_, index) => index + 1)
    : [];

  return (
    <>
      <div className='row' id='blogSection'>
        {blogs.data.map((blog) => {
          if (!blog) return null;

          const postedDate = blog.postedDate || blog.attributes?.postedDate || blog.attributes?.publishedAt;
          const date = new Date(postedDate);
          const day = date.getDate();
          const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
          const year = date.getFullYear();
          
          // Handle image URL safely
          let imageUrl = '';
          if (blog.img?.url) {
            imageUrl = "http://10.97.1.17:1337" + blog.img.url;
          } else if (blog.attributes?.image?.data?.attributes?.url) {
            imageUrl = "http://10.97.1.17:1337" + blog.attributes.image.data.attributes.url;
          }
          
          const blogTitle = blog.Title || blog.attributes?.title || 'Untitled';
          const blogId = blog.documentId || blog.id;

          return (
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12" key={blogId}>
              <div className="single_blog mb-30">
                <div className="single_blog_thumb pb-4">
                  <Link href={`/blog/${blogId}`}>
                    <span>
                      <Image src={imageUrl} alt={blogTitle}   width={64}
                      height={64} />
                    </span>
                  </Link>
                </div>
                <div className="single_blog_content pl-4 pr-4">
                  <div className="techno_blog_meta">
                    <a href="#">Somtel</a>
                    <span className="meta-date pl-3">
                      {day} {month}, {year}
                    </span>
                  </div>
                  <div className="blog_page_title pb-35">
                    <h3>
                      <Link href={`/blog/${blogId}`}>
                        <span>{blogTitle}</span>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Pagination */}
      {pageNumbers.length > 0 && (
        <div className="row">
          <div className="col-md-12">
            <div className="paginations">
              <ul className="page-numbers">
                {pageNumbers.map((pageNumber) => (
                  <li key={pageNumber}>
                    {pageNumber === Number(page) ? (
                      <span className="page-numbers current" aria-current="page">
                        {pageNumber}
                      </span>
                    ) : (
                      <Link 
                        className="page-numbers" 
                        href={{
                          pathname: router.pathname,
                          query: { ...router.query, page: pageNumber },
                          hash: "blogSection"
                        }}
                        scroll={false}
                      >
                        {pageNumber}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogCard;