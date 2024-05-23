import AppCardLayout from "./app-card-layout";

function AppCardBack() {
  return (
    <AppCardLayout>
      <div className="card__scale-1"></div>
      <div className="card__scale-2"></div>

      <div className="card__shape-1">
        <div className="card__shape-2"></div>
        <div className="card__shape-3"></div>
      </div>
    </AppCardLayout>
  );
}

export default AppCardBack;
