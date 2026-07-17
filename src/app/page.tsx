import HeroSection from "@/app/components/HeroSection";
import LatestQuestions from "@/app/components/LatestQuestions";
import TopContributers from "@/app/components/TopContributers";

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      <HeroSection />
      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Latest Questions</h2>
            <LatestQuestions />
          </div>
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold mb-6">Top Contributors</h2>
            <TopContributers />
          </div>
        </div>
      </div>
    </main>
  );
}
