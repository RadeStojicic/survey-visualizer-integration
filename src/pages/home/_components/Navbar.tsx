import Logo from "./Logo";
import RefreshIcon from "./RefreshIcon";

const Navbar = () => {
  return (
    <header className="absolute z-50 w-full px-6 py-10">
      <nav className="container mx-auto flex w-full items-center justify-between gap-4">
        <Logo />
        <button className="bg-primary flex h-12 w-auto cursor-pointer items-center gap-2 px-5 py-2 text-white">
          Refresh Data
          <RefreshIcon />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
