import Sidebar from "./Sidebar";

export default function Navbar() {
  return (
    <>
      <nav className="sticky top-0 py-5 z-50 items-center bg-white">
        <Sidebar />
      </nav>
    </>
  );
}