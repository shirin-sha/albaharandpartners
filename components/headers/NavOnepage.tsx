"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { homeItems, navItemsDefaults } from "@/data/menu";
import { MenuLink } from "@/types/menuLink";

export default function NavOnepage({
  navItems = navItemsDefaults,
  activeClass = "current-menu",
}) {
  const sectionIds = navItems;
  const [activeSection, setActiveSection] = useState(
    sectionIds[0].href.replace("#", "")
  );

  useEffect(() => {
    // Create an IntersectionObserver to track visibility of sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Update active section when the section is visible in the viewport
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px", // Trigger when section is 50% visible
      }
    );

    // Observe each section
    setTimeout(() => {
      sectionIds.forEach((elm) => {
        const element = document.querySelector(elm.href);
        if (element) {
          observer.observe(element);
        }
      });
    });
    return () => {
      // Cleanup the observer when the component unmounts
      observer.disconnect();
    };
  }, [sectionIds]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    document
      .querySelector(id)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const pathname = usePathname();
  const isMenuActive = (link: MenuLink) => {
    const currentPath = pathname?.split("/")[1] || "";
    const hrefPath = link.href?.split("/")[1] || "";
    const onePagePath = link.onePage?.split("/")[1] || "";

    return hrefPath === currentPath || onePagePath === currentPath;
  };

  return (
    <>
      <li className={`menu-item menu-item-has-children `}>
        <a href="#" className="item-link">
          Home{" "}
        </a>
        <div className="sub-menu-home">
          <ul>
            {homeItems.map((item, index) => (
              <li
                key={index}
                className={`item${
                  isMenuActive(item) ? " current-item-home" : ""
                }`}
              >
                <div>
                  <div className="image">
                    <Link className="img-home" href={item.href}>
                      <Image
                        src={item.img}
                        className="lazyload"
                        alt={item.title}
                        width={415}
                        height={342}
                      />
                    </Link>
                    <div className="list-btn">
                      <Link className="page-btn" href={item.onePage}>
                        One Page
                      </Link>
                      <Link className="page-btn" href={item.multiPage}>
                        Multi page
                      </Link>
                    </div>
                  </div>
                  <h6 className="name-home">{item.title}</h6>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </li>
      {navItems.map((item, index) => (
        <li
          key={index}
          className={` menu-item inner-link ${
            activeSection == item.href.replace("#", "") ? activeClass : ""
          }`}
        >
          <a
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={` item-link `}
          >
            {item.label}
          </a>
        </li>
      ))}
    </>
  );
}
