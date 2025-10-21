import Navbar from "./_components/Navbar";

const Home = () => {
  return (
    <>
      <div className="overflow-hidden">
        <Navbar />
        <div className="relative flex min-h-screen items-center justify-center py-60">
          <div className="bg-secondary absolute inset-2 bottom-2 rounded-4xl"></div>
          <div className="z-50 -mt-36 flex flex-col items-center justify-center text-center">
            <span className="bg-primary/5 text-text/90 flex items-center justify-center gap-1.5 rounded-full px-4 py-1 text-sm sm:text-base">
              <span className="bg-primary h-1.5 w-1.5"></span>Powered by Open
              Trivia Database
            </span>
            <h1 className="text-text mt-3 px-10 text-5xl font-bold sm:text-6xl">
              Survey Visualizer
            </h1>
            <p className="text-text/80 mt-5 px-10 text-base sm:text-lg">
              Analyze trivia questions with interactive charts. Explore
              distribution by category and difficulty.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
