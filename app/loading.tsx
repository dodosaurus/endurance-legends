export default function Loading() {
  return (
    <div id="loading" className="flex flex-col gap-5 justify-center items-center pt-16">
      <p className="font-semibold text-2xl">Loading</p>
      <div id="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
