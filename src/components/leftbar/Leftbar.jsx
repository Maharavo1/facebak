
import {
  Chat,
  Group,
  Event,
  School
} from "@mui/icons-material" ;
import './leftbar.css';
export default function Sidebar() {
return (
  <div className="sidebar containera">
    <div className="sidebarWrapper">
      <ul className="sidebarList">
        <li className="sidebarListItem">
          <Chat className="sidebarIcon" />
          <span className="sidebarListItemText">Chats</span>
        </li>
        <li className="sidebarListItem">
          <Group className="sidebarIcon" />
          <span className="sidebarListItemText">Groups</span>
        </li>
        <li className="sidebarListItem">
          <Event className="sidebarIcon" />
          <span className="sidebarListItemText">Events</span>
        </li>
        <li className="sidebarListItem">
          <School className="sidebarIcon" />
          <span className="sidebarListItemText">Courses</span>
        </li>
      </ul> 
      <ul className="sidebarFriendList">

      </ul>
    </div>
  </div>
);
}