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
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th style={{ width: "5rem" }}>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Country</th>
                  <th>Subject</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {loading && enquiries.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      Loading enquiries...
                    </td>
                  </tr>
                )}
                {!loading && enquiries.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-muted">
                      No enquiries received yet.
                    </td>
                  </tr>
                )}
                {enquiries.map((enquiry) => (
                  <tr key={enquiry._id || `${enquiry.email}-${enquiry.createdAt}`}>
                    <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>
                      {enquiry.createdAt
                        ? new Date(enquiry.createdAt).toLocaleDateString(undefined, {
                            year: "2-digit",
                            month: "short",
                            day: "2-digit",
                          })
                        : "-"}
                    </td>
                    <td>{enquiry.name}</td>
                    <td>
                      <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
                    </td>
                    <td>{enquiry.phone}</td>
                    <td>{enquiry.country}</td>
                    <td>{enquiry.subject}</td>
                    <td style={{ maxWidth: "320px" }}>
                      <span style={{ display: "block", whiteSpace: "pre-wrap" }}>{enquiry.comment}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

