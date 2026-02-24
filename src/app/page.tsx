import { GameContainer } from '@/features/game/components/game-container';

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-center p-4">
      <GameContainer />
    </main>
  );
}
