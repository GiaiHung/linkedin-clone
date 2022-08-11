import React from 'react'
import './Widget.css'
import InfoIcon from '@mui/icons-material/Info'
import CreateIcon from '@mui/icons-material/Create';

function Widgets() {
  const year = new Date().getFullYear()
  const NewsArticle = (title, subtitle) => (
    <div className="widget_article">
      <div className="widget_article_left">
        <CreateIcon />
      </div>
      <div className="widget_article_right">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  )

  return (
    <div className="widget">
      <div className="widget_header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>
      <div className="widget_body">
        {NewsArticle('Big chance in Metaverse', "We're hiring 1000 new employees!!")}
        {NewsArticle('Big chance in Google', "We're hiring 1500 new employees!!")}
        {NewsArticle('Big chance in Youtube', "We're hiring 500 new employees!!")}
        {NewsArticle('Big chance in Tiktok', "We're hiring 750 new employees!!")}
      </div>
      <div className="widget_footer">
        <img src="https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png" alt="widget_footer" />
        <div className="widget_footer_info">
          <p>About</p>
          <p>Privacy & term</p>
          <p>More</p>
          <p>Help center</p>
          <p>Advertising</p>
          <p>Accessibility</p>
        </div>
        <div className='widget_footer_copyright'>
          <img src="/images/login_logo.png" alt="" />
          <p>LinkedIn Corporation © {year}</p>
        </div>
      </div>
    </div>
  )
}

export default Widgets
