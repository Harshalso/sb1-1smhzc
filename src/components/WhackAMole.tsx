import * as React from "react";
import { ScoreBoard } from "./ScoreBoard";
import { GameProgress } from "./GameProgress";
import { GameGrid } from "./GameGrid";
import { GameOver } from "./GameOver";

const GRID_SIZE = 3;
const GAME_DURATION = 30;

interface GameState {
    score: number;
    timeLeft: number;
    moles: boolean[];
    gameActive: boolean;
    highScore: number;
}

export function WhackAMole() {
    const [gameState, setGameState] = React.useState<GameState>({
        score: 0,
        timeLeft: GAME_DURATION,
        moles: Array(GRID_SIZE * GRID_SIZE).fill(false),
        gameActive: false,
        highScore: 0
    });

    const startGame = React.useCallback(() => {
        setGameState(prev => ({
            ...prev,
            score: 0,
            timeLeft: GAME_DURATION,
            moles: Array(GRID_SIZE * GRID_SIZE).fill(false),
            gameActive: true
        }));
    }, []);

    const endGame = React.useCallback(() => {
        setGameState(prev => ({
            ...prev,
            gameActive: false,
            moles: Array(GRID_SIZE * GRID_SIZE).fill(false),
            highScore: Math.max(prev.highScore, prev.score)
        }));
    }, []);

    const updateTimeLeft = React.useCallback(() => {
        setGameState(prev => {
            if (prev.timeLeft <= 1) {
                endGame();
                return { ...prev, timeLeft: 0 };
            }
            return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
    }, [endGame]);

    const updateMoles = React.useCallback(() => {
        setGameState(prev => {
            if (!prev.gameActive) return prev;

            const newMoles = [...prev.moles];
            
            // Remove some existing moles
            newMoles.forEach((mole, index) => {
                if (mole && Math.random() > 0.5) {
                    newMoles[index] = false;
                }
            });

            // Add new moles in empty holes
            const emptyHoles = newMoles
                .map((mole, index) => !mole ? index : -1)
                .filter(index => index !== -1);

            if (emptyHoles.length > 0) {
                const randomHole = emptyHoles[Math.floor(Math.random() * emptyHoles.length)];
                newMoles[randomHole] = true;
            }

            return { ...prev, moles: newMoles };
        });
    }, []);

    const whackMole = React.useCallback((index: number) => {
        setGameState(prev => {
            if (!prev.gameActive || !prev.moles[index]) return prev;

            const newMoles = [...prev.moles];
            newMoles[index] = false;

            return {
                ...prev,
                score: prev.score + 1,
                moles: newMoles
            };
        });
    }, []);

    React.useEffect(() => {
        if (!gameState.gameActive || gameState.timeLeft <= 0) return;

        const timer = setInterval(updateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [gameState.gameActive, gameState.timeLeft, updateTimeLeft]);

    React.useEffect(() => {
        if (!gameState.gameActive) return;

        const moleTimer = setInterval(
            updateMoles,
            Math.max(1000 - gameState.score * 20, 400)
        );
        return () => clearInterval(moleTimer);
    }, [gameState.gameActive, gameState.score, updateMoles]);

    return (
        <stackLayout backgroundColor="#f3e8ff" padding={16}>
            <ScoreBoard 
                score={gameState.score} 
                highScore={gameState.highScore} 
            />
            
            <GameProgress 
                timeLeft={gameState.timeLeft} 
                maxTime={GAME_DURATION} 
            />
            
            <GameGrid 
                moles={gameState.moles}
                gameActive={gameState.gameActive}
                onWhack={whackMole}
            />
            
            {!gameState.gameActive && (
                <button
                    fontSize={18}
                    fontWeight="bold"
                    color="white"
                    backgroundColor="#9333ea"
                    padding={16}
                    borderRadius={8}
                    marginTop={16}
                    onTap={startGame}
                    text={gameState.score > 0 ? 'Play Again' : 'Start Game'}
                />
            )}
            
            {!gameState.gameActive && gameState.score > 0 && (
                <GameOver 
                    score={gameState.score}
                    isHighScore={gameState.score === gameState.highScore}
                />
            )}
        </stackLayout>
    );
}