import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play } from 'lucide-react';

interface HomeScreenProps {
    onStart: () => void;
}

export function HomeScreen({ onStart }: HomeScreenProps) {
    return (
        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
            <CardHeader className="text-center space-y-4 pb-8 pt-12">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-fuchsia-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-lg transform -rotate-6">
                    <span className="text-4xl font-bold text-white">T</span>
                </div>
                <div>
                    <CardTitle className="text-4xl font-extrabold tracking-tight bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
                        Tabuu
                    </CardTitle>
                    <CardDescription className="text-zinc-400 mt-2 text-lg">
                        Sfida i tuoi amici nel gioco di parole più divertente e frenetico
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex justify-center pb-12">
                <Button
                    onClick={onStart}
                    size="lg"
                    className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-[0_0_40px_-10px_rgba(192,38,211,0.5)] transition-all hover:scale-105 active:scale-95 group"
                >
                    <Play className="mr-2 h-5 w-5 fill-current group-hover:animate-pulse" />
                    Nuova Partita
                </Button>
            </CardContent>
        </Card>
    );
}
