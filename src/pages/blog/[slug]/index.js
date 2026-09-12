import React from 'react'
import BlogDetailCard from '../../../components/layout/blogDetailCard';
import Layout from '../../../components/layout/Layout';
import Image from 'next/image';
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  try {
    const { slug } = params;
    
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      method: 'GET',
    };

    // Fetch blog by slug using direct ID endpoint
    const res = await fetch(
      `http://10.97.1.17:1337/api/blogs/${slug}?populate=*`,
      { 
        cache: 'no-store',
        ...options 
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch blog: ${res.status}`);
      return {
        notFound: true,
      };
    }

    const blog = await res.json();

    // If no blog found, return 404
    if (!blog.data) {
      console.log('No blog found for slug:', slug);
      return {
        notFound: true,
      };
    }

    return {
      props: {
        blog,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return {
      notFound: true,
    };
  }
}

export default function BlogDetail({ blog }) {
  return (
    <Layout>
      <div className="blog_area blog-details-area pt-100 pb-100" id="blog">
        <div className="container">
          <div className="row">
            <BlogDetailCard blog={blog} />
            <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12 sidebar-right content-widget pdsr">
              <div className="blog-left-side widget">
                <div id="search-3" className="widget widget_search">
                  <div className="search">
                    <form action="#" method="get">
                      <input
                        type="text"
                        name="s"
                        defaultValue=""
                        placeholder="Type Your Keyword"
                        title="Search for:"
                      />
                      <button type="submit" className="icons">
                        <i className="fa fa-search" />
                      </button>
                    </form>
                  </div>
                </div>
                <div className="widget_about widget sn_bd_dtl_wd">
                  <h2 className="widget-title">About Us</h2>
                  <div className="widget_about_thumb">
                    {/* <img src="/assets/images/somtelaniversary(1).png" alt="" /> */}
                       <Image src="/assets/images/somtelaniversary(1).png" alt="" width={64}
                          height={64}    />
                  </div>
                  <div className="widget_about_content">
                    <h5>Somtel Somalia</h5>
                    <p>
                      We believe in upholding high standards of service and corporate social responsibilities guided by the values of. Our values define our culture, who we are and how we interact with our customers in each market. 
                    </p>
                  </div>
                  <div className="widget_about_icon">
                    <a href="#">
                      <i className="fa fa-facebook" />
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram" />
                    </a>
                    <a href="#">
                      <i className="fa fa-behance" />
                    </a>
                    <a href="#">
                      <i className="fa fa-youtube-play" />
                    </a>
                  </div>
                </div>
                <div id="categories-3" className="widget widget_categories">
                  <h2 className="widget-title">Categories</h2>
                  <ul>
                    <li className="cat-item cat-item-8">
                      <a href="#/">
                        <i className="fa fa-youtube-play" /> Articles{" "}
                        <span>(8)</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}