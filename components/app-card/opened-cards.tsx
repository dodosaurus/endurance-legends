import { Card } from "@prisma/client"
import AppCardFront from "./app-card-front"

function OpenedCards( {assignedCards}: {assignedCards: Card[]}) {
  return (
    <div className="flex justify-center items-center gap-6">
      <AppCardFront card={assignedCards[0]} />
      <AppCardFront card={assignedCards[1]} />
      <AppCardFront card={assignedCards[2]} />
      <AppCardFront card={assignedCards[3]}/>
    </div>
  )
}

export default OpenedCards