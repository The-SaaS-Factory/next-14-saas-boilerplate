import Link from "next/link";

function UpgradeteButton() {
  return (
    <div>
      <Link
        href="/home/upgrade"
        className=" text-white hover:scale-105  font-medium rounded-2xl px-2 py-1 bg-blue-500 shadow-lg shadow-blue-500/50"
      >
        <span>¡Plan Agencia!</span>
      </Link>
    </div>
  );
}

export default UpgradeteButton;
