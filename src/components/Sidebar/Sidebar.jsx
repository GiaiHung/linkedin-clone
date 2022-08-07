import { Avatar } from '@mui/material'
import './Sidebar.css'

function Sidebar() {
  const sidebarItem = (topic) => (
    <div className="sidebar_item">
      <span className="hash">#</span>
      <p>{topic}</p>
    </div>
  )

  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <img
          src="https://images.unsplash.com/photo-1517707711963-adf9078bdf01?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="background"
          className="sidebar_top_background"
        />
        <Avatar className="sidebar_top_avatar" />
        <h2>Giai Hung</h2>
        <h4>giaihung@gmail.com</h4>
      </div>

      <div className="sidebar_stats">
        <div className="sidebar_stat">
          <p>Who viewed you</p>
          <p className="sidebar_statNumber">2.345</p>
        </div>
        <div className="sidebar_stat">
          <p>Views on post</p>
          <p className="sidebar_statNumber">1.997</p>
        </div>
      </div>

      <div className="sidebar_bottom">
        <h3>Recent</h3>
        {sidebarItem('React JS')}
        {sidebarItem('Next JS')}
        {sidebarItem('Typescript')}
        {sidebarItem('Firebase')}
        {sidebarItem('Tailwind CSS')}
      </div>
    </div>
  )
}

export default Sidebar
