import React from "react";
import Header7 from "@/components/headers/Header7";
import Footer2 from "@/components/footers/Footer2";
import { servicesData2 } from "@/data/services";

export default async function SerceDetail1Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const id = resolvedSearchParams?.id;
  const service = id
    ? servicesData2.find((s) => s.id === id)
    : servicesData2[0];

  if (!service) {
    return <div className="tf-container">Solution not found.</div>;
  }

  return (
    <>
      <Header7 />
      <div className="tf-container" style={{ padding: "80px 0" }}>
        <h1 className="mb-24">{service.title}</h1>
        <p className="body-2 mb-24">{service.description}</p>
        <ul className="benefit-lists">
          {service.benefits.map((b, i) => (
            <li key={i} className="benefit-items">
              <div className="icon">
                <i className="icon-checkbox" />
              </div>
              <div className="title">{b}</div>
            </li>
          ))}
        </ul>
      </div>
      <Footer2 />
    </>
  );
}

