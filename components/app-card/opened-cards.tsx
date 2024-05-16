import AppCard from "./app-card"

function OpenedCards() {
  return (
    <div className="flex justify-center items-center gap-6">
      <AppCard />
      <AppCard />
      <AppCard />
      <AppCard />
    </div>
  )
}

export default OpenedCards