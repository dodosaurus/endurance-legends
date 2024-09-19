export default function LoadingDots() {
  return (
    <div id="loading" className="flex flex-col gap-5 justify-center items-center pt-16">
      {/* <p className="text-2xl font-semibold leading-none tracking-tight">Loading</p> */}
      <div id="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
