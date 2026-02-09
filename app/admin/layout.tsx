import { ReactNode } from "react";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import "@/components/admin/ui/admin-styles.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
