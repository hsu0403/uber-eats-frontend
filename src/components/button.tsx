interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  actionText,
  canClick,
  loading,
}) => (
  <button
    disabled={!canClick}
    className={`w-full rounded-md px-5 py-2 text-white text-lg font-medium focus:outline-none focus:bg-red-500 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-colors ${
      canClick ? "bg-red-500 hover:bg-red-600" : "bg-red-200"
    } `}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
