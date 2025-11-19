export function Loader() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-40 h-40">
        <div
          className="absolute inset-0 border-4 border-transparent border-t-primary border-r-secondary rounded-full animate-spin"
          style={{ animationDuration: "2s" }}></div>

        <div
          className="absolute inset-4 border-4 border-transparent border-b-secondary border-l-accent rounded-full animate-spin"
          style={{
            animationDuration: "3s",
            animationDirection: "reverse",
          }}></div>

        <div
          className="absolute inset-8 border-4 border-transparent border-t-accent border-b-primary rounded-full animate-spin"
          style={{ animationDuration: "1.5s" }}></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-12 h-12 bg-linear-to-br from-primary to-secondary rounded-full animate-pulse border-3 border-accent"
            style={{ animationDuration: "1.5s" }}></div>
        </div>

        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-48 text-center">
          <p className="text-sm font-black uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent animate-pulse">
            LOADING...
          </p>
        </div>
      </div>
    </div>
  );
}
