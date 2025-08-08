import Image from "next/image";

export default function WalletEmptyCard() {
  return (
    <div className="bg-[#1f2937] text-white rounded-xl p-6 shadow-md flex flex-col items-center justify-center text-center gap-3 h-full min-h-[200px]">
      <h2 className="text-base font-semibold self-start">Wallet</h2>

      <div className="flex flex-col items-center justify-center mt-4">
        <Image
          src="/assets/empty-wallet.png"
          alt="Empty Wallet"
          width={80}
          height={80}
          className="opacity-60"
        />
        <p className="mt-2 text-sm font-semibold">Oops! Nothing is here.</p>
        <p className="text-xs text-gray-400">Please, check back later.</p>
      </div>
    </div>
  );
}
