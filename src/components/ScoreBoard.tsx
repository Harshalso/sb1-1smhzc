import * as React from "react";

interface ScoreBoardProps {
    score: number;
    highScore: number;
}

export function ScoreBoard({ score, highScore }: ScoreBoardProps) {
    return (
        <gridLayout rows="auto" columns="*, *" marginTop={16} marginBottom={16}>
            <label 
                col={0} 
                fontSize={18} 
                fontWeight="bold" 
                color="#6b21a8" 
                textAlignment="center" 
                text={`Score: ${score}`} 
            />
            <label 
                col={1} 
                fontSize={18} 
                fontWeight="bold" 
                color="#6b21a8" 
                textAlignment="center" 
                text={`High Score: ${highScore}`} 
            />
        </gridLayout>
    );
}