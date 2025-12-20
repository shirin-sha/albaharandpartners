"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useContextElement } from "@/context/Context";

export default function Search() {
  const { isSearchModalOpen, setIsSearchModalOpen } = useContextElement();
  return (
    <div className={`top-search ${isSearchModalOpen ? "active" : ""} `}>
      <div className="top-search-content">
        <div className="tf-container w-1870">
          <div className="row">
            <div className="col-12">
              <div className="top-content">
                <div className="logo-search">
                  <Link href={`/`}>
                    <Image
                      alt=""
                      src="/image/logo/logo.svg"
                      width={169}
                      height={40}
                    />
                  </Link>
                </div>
                <a
                  href="#"
                  className="button-close"
                  onClick={() => setIsSearchModalOpen(false)}
                >
                  <i className="icon-close11" />
                </a>
              </div>
              <div className="wg-box-search">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="form-search"
                >
                  <fieldset className="input-search">
                    <input
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Searching...."
                    />
                    <button type="submit" className="btn-search">
                      <i className="icon-MagnifyingGlass" />
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ovelay" onClick={() => setIsSearchModalOpen(false)} />
    </div>
  );
}
