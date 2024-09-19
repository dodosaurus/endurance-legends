import { Badge } from "@/components/ui/badge";
import { CoinIcon } from "@/components/coin-icon";
import { calcActivityCoins } from "@/server/calculations";
import { Activity } from "@prisma/client";

type Props = {
  activity: Activity;
};

export function ActivityCoinsBadge({ activity }: Props) {
  const coins = calcActivityCoins(activity);
  
  let badgeClasses = "text-lg mx-auto ";
  let textClasses = "";
  let prefix = "";

  if (coins > 0) {
    badgeClasses += "bg-emerald-50 dark:bg-emerald-900/75 border-emerald-600 dark:border-emerald-400";
    textClasses = "text-emerald-600 dark:text-emerald-400";
    prefix = "+";
  } else if (coins < 0) {
    badgeClasses += "bg-red-50 dark:bg-red-900/75 border-red-600 dark:border-red-400";
    textClasses = "text-red-600 dark:text-red-400";
    prefix = "-";
  } else {
    badgeClasses += "bg-gray-50 dark:bg-gray-900/75 border-gray-600 dark:border-gray-400";
    textClasses = "text-gray-600 dark:text-gray-400";
  }

  return (
    <Badge className={badgeClasses} variant="secondary">
      <div className={`flex justify-center items-center gap-1 ${textClasses}`}>
        {prefix && <span className="flex items-center">{prefix}</span>}
        <span>{Math.abs(coins).toString()}</span>
        <CoinIcon w="10px" className="w-4 h-4" />
      </div>
    </Badge>
  );
}