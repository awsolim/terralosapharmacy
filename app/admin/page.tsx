import { adminPages } from "@/lib/site";
import { PlaceholderPage } from "@/components/ui/placeholder-page";

export default function AdminDashboardPage() {
  return <PlaceholderPage {...adminPages.dashboard} tone="admin" />;
}
