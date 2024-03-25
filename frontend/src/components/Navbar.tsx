import { Outlet } from "react-router-dom";

export default function Navbar() {
  return <div>
    <h1>DermaSystem</h1>
    <Outlet />
  </div>
}