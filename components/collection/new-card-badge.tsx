import { Badge } from "../ui/badge";

function NewCardBadge() {
  return (
    <Badge
      className="absolute top-10 -left-2 z-10 text-lg font-bold text-rose-800 bg-rose-100 hover:bg-rose-100 dark:text-rose-100 dark:bg-rose-900 dark:hover:bg-rose-900"
      variant="secondary"
    >
      New!
    </Badge>
  );
}

export default NewCardBadge;
