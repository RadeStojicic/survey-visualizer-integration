import Logo from "./Logo";

const Navbar = () => {
  return (
    <header className="absolute z-50 w-full py-10">
      <nav className="container mx-auto flex items-center justify-center">
        <Logo />
      </nav>
    </header>
  );
};

export default Navbar;
