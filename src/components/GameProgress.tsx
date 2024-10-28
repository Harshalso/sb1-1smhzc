import * as React from "react";

interface GameProgressProps {
    timeLeft: number;
    maxTime: number;
}

export function GameProgress({ timeLeft, maxTime }: GameProgressProps) {
    const progress = (timeLeft / maxTime) * 100;
    
    return (
        <stackLayout marginTop={16} marginBottom={16}>
            <label 
                fontSize={14} 
                color="#6b21a8" 
                marginBottom={4} 
                textAlignment="center" 
                text={`${timeLeft}s`} 
            />
            <gridLayout height={4} backgroundColor="#e9d5ff" borderRadius={2}>
                <gridLayout 
                    height="100%" 
                    backgroundColor="#9333ea" 
                    borderRadius={2} 
                    width={`${progress}%`} 
                />
            </gridLayout>
        </stackLayout>
    );
}