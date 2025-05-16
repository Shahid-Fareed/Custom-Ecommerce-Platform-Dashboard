import React from "react";
import { useState } from "react";
import Link from "next/link";
import { CiHome, CiGrid41 } from "react-icons/ci";
import { MdOutlinePayments } from "react-icons/md";
import { HiOutlineUsers, HiOutlineCodeBracketSquare } from "react-icons/hi2";
import {
  IoPieChartOutline,
  IoBookOutline,
  IoNotificationsOutline,
} from "react-icons/io5";

interface ChildItem {
  id: number;
  childtitle: string;
  childlink: string;
}

interface MenuItem {
  id: number;
  title: string;
  icon: JSX.Element;
  link: string;
  subMenu?: boolean;
  child?: ChildItem[];
}

function Menu() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  // Open Navigation Dropdown
  const handleForDropdown = (index: number) => {
    setOpenMenuId((prevId) => (prevId === index ? null : index));
  };

  // Navigation
  const navigation = [
    {
      id: 1,
      title: "Home",
      icon: <CiHome />,
      link: "/",
    },
    {
      id: 2,
      title: "Payments",
      icon: <MdOutlinePayments />,
      link: "#",
    },
    {
      id: 3,
      title: "Customers",
      icon: <HiOutlineUsers />,
      link: "#",
      subMenu: true,
      child: [
        {
          id: 1,
          childtitle: "All Customers",
          childlink: "/customers",
        },
        // {
        // id: 2,
        // childtitle: "Add Customers",
        // childlink: "add-customers",
        // },
        // {
        // id: 3,
        // childtitle: "Edit Customers",
        // childlink: "edit-customers",
        // },
      ],
    },
    {
      id: 4,
      title: "Reports",
      icon: <IoPieChartOutline />,
      link: "#",
      subMenu: true,
      child: [
        {
          id: 1,
          childtitle: "All Reports",
          childlink: "all-reports",
        },
        {
          id: 3,
          childtitle: "Add Reports",
          childlink: "add-reports",
        },
        {
          id: 3,
          childtitle: "Edit Reports",
          childlink: "edit-reports",
        },
      ],
    },
    {
      id: 5,
      title: "Products",
      icon: <CiGrid41 />,
      link: "#",
      subMenu: true,
      child: [
        {
          id: 3,
          childtitle: "Products",
          childlink: "/products",
        },
        {
          id: 3,
          childtitle: "Categories",
          childlink: "/categories",
        },
        {
          id: 3,
          childtitle: "Attribute",
          childlink: "/attribute",
        },
        {
          id: 3,
          childtitle: "Attribute Type",
          childlink: "/attributetype",
        },
        {
          id: 3,
          childtitle: "Materials",
          childlink: "/material",
        },
        {
          id: 3,
          childtitle: "Pattern",
          childlink: "/pattern",
        },
        {
          id: 3,
          childtitle: "Price Slabs",
          childlink: "/priceslab",
        },
        {
          id: 3,
          childtitle: "Fonts",
          childlink: "/font",
        },
        {
          id: 3,
          childtitle: "Colors",
          childlink: "/color",
        },
        {
          id: 3,
          childtitle: "Printing Style",
          childlink: "/printingstyle",
        },
        {
          id: 3,
          childtitle: "Fitting Style",
          childlink: "/fittingstyle",
        },
      ],
    },
    {
      id: 6,
      title: "CMS",
      icon: <HiOutlineCodeBracketSquare />,
      link: "#",
      subMenu: true,
      child: [
        {
          id: 3,
          childtitle: "Pages",
          childlink: "/pages",
        },
        {
          id: 3,
          childtitle: "Banners",
          childlink: "/banners",
        },
        {
          id: 3,
          childtitle: "Faqs",
          childlink: "/faq",
        },
        {
          id: 3,
          childtitle: "Blogs",
          childlink: "/blogs",
        },
        {
          id: 3,
          childtitle: "Blog Categories",
          childlink: "/blogcategories",
        },
      ],
    },
    {
      id: 7,
      title: "Forms",
      icon: <IoBookOutline />,
      link: "#",
      subMenu: true,
      child: [
        {
          id: 3,
          childtitle: "Super Design",
          childlink: "/superdesign",
        },
        {
          id: 3,
          childtitle: "Photowall",
          childlink: "/photowall",
        },
        {
          id: 3,
          childtitle: "Contact Form",
          childlink: "/contactform",
        },
      ],
    },
  ];
  return (
    <nav className="max-h-[650px] overflow-y-scroll">
      <ul className="space-y-2 w-full p-3">
        {navigation &&
          navigation.map((item, index) => (
            <li key={item.id} className="group">
              <div
                onClick={() => handleForDropdown(index)}
                className="cursor-pointer flex items-center text-sm py-1 font-[400] group-hover:bg-[#f5f6f8]"
              >
                {/* {item.icon} */}
                <span className="ml-2 group-hover:text-blue-800">
                  {item.title}
                </span>
              </div>
              <ul
                className={`${
                  openMenuId === index ? "h-auto" : "h-0 overflow-hidden"
                } ml-2 text-sm transition-all duration-1000`}
              >
                {item.subMenu &&
                  item.child?.map((submenu) => (
                    <li
                      key={submenu.id}
                      className="py-2 border-t border-t-gray-100 last:border-b last:border-b-gray-100"
                    >
                      <Link href={submenu.childlink}>
                        <span className="hover:font-semibold transition-all duration-500 pl-2">
                          {submenu.childtitle}
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export default Menu;
