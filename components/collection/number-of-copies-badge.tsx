import { Badge } from "../ui/badge";

function NumberOfCopiesBadge({ numberOfCopies }: { numberOfCopies: number }) {
  return (
    <Badge
      className="absolute -top-1 -left-1 z-10 text-lg font-bold text-cyan-800 bg-cyan-100 hover:bg-cyan-100 dark:text-cyan-100 dark:bg-cyan-900 dark:hover:bg-cyan-900"
      variant="secondary"
    >
      x {numberOfCopies}
    </Badge>
  );
}

export default NumberOfCopiesBadge;
