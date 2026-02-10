"use client";

import React, { useEffect, useState } from "react";
import { Card, Alert, Button } from "@/components/admin/ui";

interface Enquiry {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  subject: string;
  comment: string;
  createdAt: string;
}

interface EnquiriesResponse {
  success: boolean;
  data: Enquiry[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
  message?: string;
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Enquiry | null>(null);

  const loadEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/enquiries?limit=100");
      const json = (await res.json()) as EnquiriesResponse;
      if (!json.success) {
        throw new Error(json.message || "Failed to load enquiries");
      }
      setEnquiries(json.data || []);
    } catch (err: any) {
      console.error("Failed to load enquiries", err);
      setError(err.message || "Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  return (
    <div className="admin-bg-gradient">
      <div className="admin-header-sticky border-bottom">
        <div className="container-fluid py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h2 mb-1" style={{ fontSize: "2rem", fontWeight: 700 }}>
                📥 Enquiries
              </h1>
              <p className="text-muted mb-0" style={{ fontSize: "1.1rem" }}>
                View contact form submissions from the website
              </p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Button variant="secondary" size="sm" onClick={loadEnquiries} disabled={loading}>
                {loading ? "Refreshing..." : "Refresh"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-3">
        {error && (
          <div className="mb-3">
            <Alert type="error" message={error} onClose={() => setError(null)} />
          </div>
        )}

<Card>
  <div className="table-responsive">
     <table className="table align-middle mb-0 enquiries-table">
      <thead>
        <tr>
           <th style={{ width: "120px" }}>Date</th>
           <th style={{ width: "200px" }}>Name</th>
           <th style={{ width: "260px" }}>Email</th>
           <th>Subject</th>
           <th style={{ width: "80px" }} className="text-end">
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        {loading && enquiries.length === 0 && (
           <tr>
             <td colSpan={5} className="text-center py-5 text-muted">
              Loading enquiries…
            </td>
          </tr>
        )}

        {!loading && enquiries.length === 0 && (
           <tr>
             <td colSpan={5} className="text-center py-5 text-muted">
              No enquiries received yet.
            </td>
          </tr>
        )}

        {enquiries.map((enquiry) => {
          const isActive =
            selected &&
            (selected._id && enquiry._id
              ? selected._id === enquiry._id
              : selected.email === enquiry.email &&
                selected.createdAt === enquiry.createdAt);

          return (
            <tr
              key={enquiry._id || `${enquiry.email}-${enquiry.createdAt}`}
              className={isActive ? "table-active" : ""}
            >
              <td className="text-muted small">
                {enquiry.createdAt
                  ? new Date(enquiry.createdAt).toLocaleDateString(undefined, {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "-"}
              </td>

              <td>
                <div className="fw-semibold">{enquiry.name}</div>
              </td>

               <td>
                 <a href={`mailto:${enquiry.email}`} className="text-decoration-none">
                   {enquiry.email}
                 </a>
               </td>

              <td>
                <div className="subject-cell">
                  {enquiry.subject || "-"}
                </div>
              </td>
              <td className="text-center">
  <span
    className="view-icon"
    onClick={() => setSelected(enquiry)}
    title="View enquiry"
  >
    <i className="icon-Eye" />
  </span>
</td>

            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</Card>


        {/* Details modal */}
        {selected && (
          <div
            className="position-fixed"
            style={{
              top: 0,
              right: 0,
              bottom: 0,
              left: "260px", // align with sidebar width so modal sits over content only
              backgroundColor: "rgba(15, 23, 42, 0.4)",
              zIndex: 1050,
            }}
            onClick={() => setSelected(null)}
          >
            <div
              className="d-flex justify-content-center align-items-center h-100 px-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="bg-white rounded-3 shadow-lg"
                style={{ maxWidth: "640px", width: "100%" }}
              >
                <div className="border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="h5 mb-1">{selected.name}</h2>
                    <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                      {selected.createdAt
                        ? new Date(selected.createdAt).toLocaleString()
                        : ""}
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => setSelected(null)}>
                    Close
                  </Button>
                </div>

                <div className="px-4 py-3">
                  <dl className="row mb-0">
                    <dt className="col-4 text-muted">Email</dt>
                    <dd className="col-8 mb-2">
                      <a href={`mailto:${selected.email}`}>{selected.email}</a>
                    </dd>

                    <dt className="col-4 text-muted">Phone</dt>
                    <dd className="col-8 mb-2">{selected.phone || "-"}</dd>

                    <dt className="col-4 text-muted">Country</dt>
                    <dd className="col-8 mb-2">{selected.country || "-"}</dd>

                    <dt className="col-4 text-muted">Subject</dt>
                    <dd className="col-8 mb-2">{selected.subject}</dd>

                    <dt className="col-12 text-muted mt-2">Message</dt>
                    <dd className="col-12 mb-0">
                      <div
                        style={{
                          whiteSpace: "pre-wrap",
                          background: "var(--bg-1)",
                          borderRadius: "8px",
                          padding: "12px 14px",
                         
                          lineHeight: 1.5,
                        }}
                      >
                        {selected.comment}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

