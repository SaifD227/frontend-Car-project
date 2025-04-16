"use client";
import { useState } from "react";
import Image from "next/image";
import usa from "../../../public/download (15).png";
import chines from "../../../public/chines.avif";
import frenhc from "../../../public/french.jpeg";
import Link from "next/link";
import CustomizedDialogs from "../CustomizedDialogs";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md px-4 md:px-6 py-4 w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-lg text-teal-500 font-bold">carAdviser</div>

          <div className="hidden md:flex items-center space-x-6">
            {["HOMEPAGE", "THE TEAM", "CATALOG", "CONTACT US", "VLOG AUTO"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-black font-medium hover:text-teal-500"
                >
                  {item}
                </a>
              )
            )}
            <button
              className="bg-teal-600 text-white px-10 py-2"
              onClick={() => setOpenDialog(true)}
            >
              Post Car
            </button>

            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center space-x-2 border px-3 py-2 rounded-lg hover:bg-gray-100">
                <Image
                  src={usa}
                  alt="USA flag"
                  width={20}
                  height={20}
                  className="rounded-sm"
                />
                <span>ENGLISH</span>
                <span className="ml-1">▼</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                  {[
                    { img: usa, lang: "English" },
                    { img: chines, lang: "Chinese" },
                    { img: frenhc, lang: "French" },
                  ].map(({ img, lang }) => (
                    <a
                      key={lang}
                      href="#"
                      className="flex items-center px-4 py-2 text-black hover:bg-gray-100"
                    >
                      <Image
                        src={img}
                        alt={`${lang} flag`}
                        width={20}
                        height={20}
                        className="rounded-sm mr-2"
                      />
                      {lang}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/login">
                <span className="text-black font-medium">Sign in</span>
              </Link>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-black"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <CustomizedDialogs
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </>
  );
};

export default Navbar;
