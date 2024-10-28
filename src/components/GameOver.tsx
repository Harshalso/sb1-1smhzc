import * as React from "react";

interface GameOverProps {
    score: number;
    isHighScore: boolean;
}

export function GameOver({ score, isHighScore }: GameOverProps) {
    return (
        <stackLayout marginTop={16} padding={16} backgroundColor="#f8fafc" borderRadius={8}>
            <label
                fontSize={20}
                fontWeight="bold"
                color="#dc2626"
                marginBottom={8}
                textAlignment="center"
                text="Game Over!"
            />
            <label
                fontSize={16}
                color="#374151"
                textAlignment="center"
                text={`You whacked ${score} moles!${isHighScore ? " That's a new high score!" : ""}`}
            />
        </stackLayout>
    );
}