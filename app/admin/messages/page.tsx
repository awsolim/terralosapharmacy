import { adminPages } from "@/lib/site";
import { PlaceholderPage } from "@/components/ui/placeholder-page";

export default function AdminMessagesPage() {
  return <PlaceholderPage {...adminPages.messages} tone="admin" />;
}
