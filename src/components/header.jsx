import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "..//components/ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/auth-slice/index";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-violet-900 border-b border-violet-700 shadow-md">
      <div className="flex items-center">
        <Button onClick={() => setOpen(true)} className="lg:hidden sm:block bg-violet-800 hover:bg-violet-700">
          <AlignJustify className="text-white" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <h1 className="text-white font-bold ml-4 text-xl hidden sm:block">Admin Dashboard</h1>
      </div>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow bg-violet-800 hover:bg-violet-700 text-white"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
