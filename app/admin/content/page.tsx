import { adminPages } from "@/lib/site";
import { PlaceholderPage } from "@/components/ui/placeholder-page";

export default function AdminContentPage() {
  return <PlaceholderPage {...adminPages.content} tone="admin" />;
}
