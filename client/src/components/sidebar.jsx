import {
    BadgeCheck,
    ChartNoAxesCombined,
    LayoutDashboard,
    ShoppingBasket,
  } from "lucide-react";
  import { Fragment } from "react";
  import { useNavigate } from "react-router-dom";
  import { Sheet, SheetContent, SheetHeader, SheetTitle } from "..//components/ui/sheet";
  
  const adminSidebarMenuItems = [
    {
      id: "Qrscanner",
      label: "Qrscanner",
      path: "qr",
      icon: <LayoutDashboard />,
    },
    {
      id: "events",
      label: "Events",
      path: "events",
      icon: <ShoppingBasket />,
    },
    {
      id: "orders",
      label: "Orders",
      path: "/admin/orders",
      icon: <BadgeCheck />,
    },
  ];
  
  function MenuItems({ setOpen }) {
    const navigate = useNavigate();
  
    return (
      <nav className="mt-8 flex-col flex gap-2">
        {adminSidebarMenuItems.map((menuItem) => (
          <div
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              setOpen ? setOpen(false) : null;
            }}
            className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-white bg-violet-900/50 hover:bg-violet-800 shadow-sm"
          >
            <span className="text-violet-300">{menuItem.icon}</span>
            <span className="font-medium">{menuItem.label}</span>
          </div>
        ))}
      </nav>
    );
  }
  
  function AdminSideBar({ open, setOpen }) {
    const navigate = useNavigate();
  
    return (
      <Fragment>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-64 bg-violet-950 border-r border-violet-800">
            <div className="flex flex-col h-full">
              <SheetHeader className="border-b border-violet-800">
                <SheetTitle className="flex gap-2 mt-5 mb-5 text-white">
                  <ChartNoAxesCombined size={30} className="text-violet-300" />
                  <h1 className="text-2xl font-extrabold">Meeting coordinator</h1>
                </SheetTitle>
              </SheetHeader>
              <MenuItems setOpen={setOpen} />
            </div>
          </SheetContent>
        </Sheet>
        <aside className="hidden w-64 flex-col border-r border-violet-800 bg-violet-950 p-6 lg:flex">
          <div
            onClick={() => navigate("qr")}
            className="flex cursor-pointer items-center gap-2 text-white"
          >
            <ChartNoAxesCombined size={30} className="text-violet-300" />
            <h1 className="text-2xl font-extrabold">Meeting coordinator</h1>
          </div>
          <MenuItems />
        </aside>
      </Fragment>
    );
  }
  
  export default AdminSideBar;
  