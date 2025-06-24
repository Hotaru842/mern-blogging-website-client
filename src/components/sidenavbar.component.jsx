import { Outlet } from "react-router-dom";

const SideNavbar = () => {
  return (
   <>
     <div>This is a Side-Navbar</div>
     <Outlet />
   </>
  )
}

export default SideNavbar;