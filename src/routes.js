import Home from "./views/Home/Home.js";
import Dashboard from "./views/Dashboard/Dashboard.js";
import Connect from "./views/Connect/Connect.js";

import { HomeIcon, PersonIcon } from "./components/Icons/Icons";

var dashRoutes = [
  {
    path: "home",
    name: "Home",
    icon: <HomeIcon color="inherit" />,
    component: Home,
    layout: "/",
  },
  {
    path: "dashboard",
    name: "Dashboard",
    icon: <PersonIcon color="inherit" />,
    component: Dashboard,
    layout: "/",
  },
  {
    path: "/connect",
    name: "Connect",
    icon: <PersonIcon color="inherit" />,
    component: Connect,
    layout: "/user",
  },
];
export default dashRoutes;
