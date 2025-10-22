import { RefreshCwIcon } from "lucide-react";

type HeaderProps = {
  onRefresh: () => void;
};

const Header = ({ onRefresh }: HeaderProps) => (
  <div className="mb-6 flex items-center justify-end">
    <button
      onClick={onRefresh}
      className="bg-primary flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition hover:opacity-90"
    >
      Refresh Data <RefreshCwIcon size={18} />
    </button>
  </div>
);

export default Header;
