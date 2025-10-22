import { EllipsisIcon, RefreshCwIcon } from "lucide-react";

type HeaderProps = {
  onRefresh: () => void;
  timedOut: boolean;
};

const Header = ({ onRefresh, timedOut }: HeaderProps) => (
  <div className="mb-6 flex items-center gap-4 sm:justify-end">
    <button
      disabled={timedOut}
      onClick={onRefresh}
      className="bg-primary flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50!"
    >
      {timedOut ? (
        <>
          Please wait <EllipsisIcon size={18} />
        </>
      ) : (
        <>
          Load Data <RefreshCwIcon size={18} />
        </>
      )}
    </button>
  </div>
);

export default Header;
