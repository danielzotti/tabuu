import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, Trophy } from 'lucide-react';
import Image from 'next/image';

interface EndScreenProps {
    score: number;
    correctCount: number;
    passesCount: number;
    tabuusCount: number;
    onPlayAgain: () => void;
}

export function EndScreen({ score, correctCount, passesCount, tabuusCount, onPlayAgain }: EndScreenProps) {
    return (
        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl shadow-2xl text-center overflow-hidden animate-in zoom-in-95 duration-500">
            <CardHeader className="space-y-6 pb-0 pt-4">
                {/* <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-yellow-400 to-amber-600 rounded-full flex items-center justify-center shadow-[0_0_50px_-10px_rgba(251,191,36,0.5)]">
                    <Trophy className="w-12 h-12 text-white" />
                </div> */}
                <Image src="/tabuu-logo.png" className="mx-auto" width={120} height={120} alt="Logo" />
                <div>
                    <CardTitle className="text-3xl font-bold text-white mb-2">
                        Tempo Scaduto!
                    </CardTitle>
                    <CardDescription className="text-zinc-400 text-lg">
                        Ecco il tuo punteggio finale
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-8 pb-12">
                <div className="text-7xl font-extrabold bg-gradient-to-br from-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                    {score}
                </div>
                <div className="flex justify-center gap-8 pt-4 pb-2 border-t border-zinc-800">
                    <div className="text-center">
                        <div className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-1">Corretto</div>
                        <div className="text-2xl font-bold text-fuchsia-400">{correctCount}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-1">Passo</div>
                        <div className="text-2xl font-bold text-zinc-300">{passesCount}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-1">Tabuu</div>
                        <div className="text-2xl font-bold text-red-400">{tabuusCount}</div>
                    </div>
                </div>
                <Button
                    onClick={onPlayAgain}
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 py-6 text-lg font-semibold border-zinc-700 bg-zinc-800/50 text-white hover:bg-zinc-800 hover:text-white transition-all hover:scale-105 active:scale-95"
                >
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Gioca Ancora
                </Button>
            </CardContent>
        </Card>
    );
}
