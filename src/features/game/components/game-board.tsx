import { Card } from '../game.models';
import { Button } from '@/components/ui/button';
import { Check, X, SkipForward, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GameBoardProps {
    card: Card;
    onCorrect: () => void;
    onPass: () => void;
    onTaboo: () => void;
    onTimeUp: () => void;
}

export function GameBoard({ card, onCorrect, onPass, onTaboo, onTimeUp }: GameBoardProps) {
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft((t) => t - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, onTimeUp]);

    return (
        <div className="flex flex-col space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Timer Bar */}
            <div className="flex items-center justify-between bg-zinc-900/80 backdrop-blur-md rounded-2xl p-4 border border-zinc-800 shadow-xl">
                <div className="flex items-center text-zinc-300 font-medium">
                    <Timer className="w-5 h-5 mr-2 text-fuchsia-400" />
                    Tempo
                </div>
                <div className={`text-2xl font-bold font-mono ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                    00:{timeLeft.toString().padStart(2, '0')}
                </div>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden transform transition-all border-4 border-fuchsia-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -ml-16 -mb-16" />

                <div className="relative text-center space-y-8">
                    <div>
                        <p className="text-fuchsia-600 font-bold uppercase tracking-widest text-sm mb-2">Parola da indovinare</p>
                        <h2 className="text-5xl font-extrabold text-zinc-900 tracking-tight leading-none break-words">
                            {card.word}
                        </h2>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-zinc-100 relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                            Parole Taboo
                        </div>
                        {card.forbiddenWords.map((word, idx) => (
                            <div
                                key={idx}
                                className="text-2xl font-bold text-zinc-700 bg-zinc-50 py-3 rounded-xl border border-zinc-100 shadow-sm"
                            >
                                {word}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-3">
                <Button
                    onClick={onTaboo}
                    variant="outline"
                    className="h-20 flex-col bg-zinc-900/50 border-red-500/20 hover:bg-red-500/10 hover:border-red-500/50 text-red-400 hover:text-red-300 rounded-2xl transition-all"
                >
                    <X className="w-8 h-8 mb-1" />
                    <span className="text-xs font-bold uppercase tracking-wider">Taboo</span>
                </Button>
                <Button
                    onClick={onPass}
                    variant="outline"
                    className="h-20 flex-col bg-zinc-900/50 border-zinc-700 hover:bg-zinc-800 text-zinc-300 rounded-2xl transition-all"
                >
                    <SkipForward className="w-8 h-8 mb-1" />
                    <span className="text-xs font-bold uppercase tracking-wider">Passo</span>
                </Button>
                <Button
                    onClick={onCorrect}
                    className="h-20 flex-col bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-2xl shadow-[0_0_30px_-10px_rgba(192,38,211,0.5)] transition-all"
                >
                    <Check className="w-8 h-8 mb-1" />
                    <span className="text-xs font-bold uppercase tracking-wider">Corretto</span>
                </Button>
            </div>
        </div>
    );
}
