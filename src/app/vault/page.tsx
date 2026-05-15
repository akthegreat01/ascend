import MediaVault from "@/components/MediaVault";
import PremiumGate from "@/components/PremiumGate";

export default function VaultPage() {
  return (
    <PremiumGate 
      featureName="Media Vault" 
      description="Access your private library of high-focus video assets and motivational reels."
    >
      <div className="flex flex-col gap-10 py-8 px-6">
      <header>
        <h1 className="text-4xl font-black text-white tracking-tight font-['Outfit'] mb-2 uppercase tracking-[0.2em]">
          Media Vault
        </h1>
        <p className="text-gray-400 text-lg">
          Your curated library of productivity inspiration, videos, and reels.
        </p>
      </header>
      <div className="max-w-4xl">
        <MediaVault />
      </div>
    </div>
    </PremiumGate>
  );
}
