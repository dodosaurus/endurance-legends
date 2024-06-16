import { Badge } from "../ui/badge";

function TopTenBadge() {
  return (
    <Badge className="rounded-none rounded-l-sm absolute z-2 top-12 right-0 text-md pointer-events-none font-bold text-amber-800 bg-amber-100 hover:bg-amber-100 dark:text-amber-100 dark:bg-amber-900 dark:hover:bg-amber-900">
      Top 10
    </Badge>
  );
}

export default TopTenBadge;
