// pages/blog/index.js
import React from 'react'
import Head from "next/head";
import Image from 'next/image';
import BlogCard from "../../components/layout/blogCard";
import Layout from '../../components/layout/Layout';

// This function only runs on the server, so we can call our API directly
async function fetchBlogs(page = 1) {
  try {
    // Call Strapi API directly instead of going through our own API route
    const response = await fetch(
      `http://websiteapi.somtelsomalia.net/api/blogs?pagination[page]=${page}&pagination[pageSize]=6&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { data: [], meta: {} };
  }
}

export default function Blog({ blogsData, currentPage }) {
  return (
    <Layout>
      <Head>
        <title>Company Blog - Somtel Somalia</title>
        <meta name="description" content="Latest blog posts and insights from Somtel Somalia" />
      </Head>

      {/* <Slider />
      <Service /> */}

      {/* Blog Header Section */}
      <div
        className="video_area pt-80 pb-50"
        style={{ backgroundImage: "url(assets/images/slider/slider-3.png)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section_title text_center white mb-55">
                <div className="section_main_title">
                  <h1 style={{ color: "#fed900" }}>Company Blog</h1>
                  <h1 style={{ color: "#fff" }}>Insights, Updates & Stories</h1>
                  <p className="descStyle2" style={{ color: "#fff" }}>
                    Explore our latest articles, news updates, and expert insights across
                    a variety of topics relevant to our community and industry.
                  </p>
                </div>
                <div className="em_bar">
                  <div className="em_bar_bg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content Section */}
      <div className="blog_area blog-grid left-sidebar pt-90 pb-80" id="blog">
        <div className="container">
          <div className="row">
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
                    <Image 
                      src="/assets/images/somtelaniversary(1).png" 
                      alt="Somtel Somalia" 
                      width={64}
                      height={64}
                    />
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
              </div>
            </div>
            
            <div className="col-lg-8 col-md-7 col-sm-12 col-xs-12">
              <BlogCard blogs={blogsData} currentPage={currentPage} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { page = 1 } = context.query;
  
  try {
    const blogsData = await fetchBlogs(page);
    
    return {
      props: {
        blogsData,
        currentPage: parseInt(page)
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        blogsData: { data: [], meta: {} },
        currentPage: parseInt(page)
      },
    };
  }
}