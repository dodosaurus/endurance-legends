import AppCardFront from "./app-card-front"

function OpenedCards() {
  return (
    <div className="flex justify-center items-center gap-6">
      <AppCardFront />
      <AppCardFront />
      <AppCardFront />
      <AppCardFront />
    </div>
  )
}

export default OpenedCards