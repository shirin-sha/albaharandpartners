"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import Drift from "drift-zoom";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useEffect, useRef, useState } from "react";

export default function Slider({
  selected = "",
  setSelected = (type: string) => {},
}) {
  const productImages = [
    {
      id: 1,
      src: "/image/project-item/tf-product-media-thumbs-1.jpg",
      type: "type-1",
    },
    {
      id: 2,
      src: "/image/project-item/tf-product-media-thumbs-2.jpg",
      type: "type-1",
    },
    {
      id: 3,
      src: "/image/project-item/tf-product-media-thumbs-3.jpg",
      type: "type-2",
    },
    {
      id: 4,
      src: "/image/project-item/tf-product-media-thumbs-4.jpg",
      type: "type-3",
    },
  ];
  const [swiperThumb, setSwiperThumb] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    // Function to initialize Drift
    // Function to check window width
    const checkWindowSize = () => window.innerWidth >= 1200;

    // Only proceed if window is wide enough
    if (!checkWindowSize()) return;

    const imageZoom = () => {
      const driftAll = document.querySelectorAll(".tf-image-zoom");
      const pane = document.querySelector(".tf-zoom-main");

      driftAll.forEach((el) => {
        if (el && pane) {
          new Drift(el as HTMLElement, {
            zoomFactor: 2,
            paneContainer: pane as HTMLElement,
            inlinePane: 0,
            handleTouch: false,
            hoverBoundingBox: true,
            containInline: true,
          });
        }
      });
    };
    imageZoom();
    const zoomElements = document.querySelectorAll(".tf-image-zoom");

    const handleMouseOver = (event: Event) => {
      const parent = (event.target as Element).closest(".section-image-zoom");
      if (parent) {
        parent.classList.add("zoom-active");
      }
    };

    const handleMouseLeave = (event: Event) => {
      const parent = (event.target as Element).closest(".section-image-zoom");
      if (parent) {
        parent.classList.remove("zoom-active");
      }
    };

    zoomElements.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup event listeners on component unmount
    return () => {
      zoomElements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []); // Empty dependency array to run only once on mount
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);
  useEffect(() => {
    // Initialize PhotoSwipeLightbox
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-swiper-started",
      children: ".item",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();

    // Store the lightbox instance in the ref for later use
    lightboxRef.current = lightbox;

    // Cleanup: destroy the lightbox when the component unmounts
    return () => {
      lightbox.destroy();
    };
  }, []);

  const swiperRef = useRef<SwiperType | null>(null);
  useEffect(() => {
    if (!(productImages[activeIndex].type == selected)) {
      const slideIndex =
        productImages.filter((elm) => elm.type == selected)[0]?.id - 1;
      if (swiperRef.current) {
        swiperRef.current.slideTo(slideIndex);
      }
    }
  }, [selected]);
  useEffect(() => {
    setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.slideTo(1);
        swiperRef.current.slideTo(
          productImages.filter((elm) => elm.type == selected)[0]?.id - 1
        );
      }
    });
  }, []);
  return (
    <>
      {" "}
      <Swiper
        modules={[Thumbs, Navigation]}
        navigation={{
          prevEl: ".ssp1",
          nextEl: ".ssn1",
        }}
        id="gallery-swiper-started"
        thumbs={{ swiper: swiperThumb }}
        dir="ltr"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="swiper tf-product-media-main"
        onSlideChange={(swiper) => {
          if (productImages[swiper.activeIndex]) {
            setActiveIndex(swiper.activeIndex);
            setSelected(productImages[swiper.activeIndex]?.type);
          }
        }}
      >
        {productImages.map((elm, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <a
              href={`${elm.src}`}
              target="_blank"
              data-pswp-height="630px"
              data-pswp-width="630px"
              className="image-main item"
            >
              <Image
                src={`${elm.src}`}
                data-zoom={`${elm.src}`}
                alt=""
                className="lazyload tf-image-zoom"
                width={630}
                height={630}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        className="swiper tf-product-media-thumbs"
        {...{
          slidesPerView: "auto",
          spaceBetween: 10,
          freeMode: true,
          watchSlidesProgress: true,
          observer: true,
          observeParents: true,
        }}
        onSwiper={(swiper) => setSwiperThumb(swiper)}
        modules={[Thumbs, FreeMode]}
      >
        {productImages.map((elm, i) => (
          <SwiperSlide key={i} className="swiper-slide">
            <div className="item">
              <Image
                className="lazyload"
                alt=""
                src={elm.src}
                width={630}
                height={630}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
