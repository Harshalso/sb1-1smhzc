import * as React from "react";

interface GameGridProps {
    moles: boolean[];
    gameActive: boolean;
    onWhack: (index: number) => void;
}

export function GameGrid({ moles, gameActive, onWhack }: GameGridProps) {
    return (
        <gridLayout 
            rows="auto, auto, auto" 
            columns="auto, auto, auto" 
            horizontalAlignment="center" 
            marginTop={16}
        >
            {moles.map((mole, index) => (
                <button
                    key={index}
                    row={Math.floor(index / 3)}
                    col={index % 3}
                    className={mole ? "mole-button" : "empty-button"}
                    width={80}
                    height={80}
                    margin={4}
                    fontSize={32}
                    textAlignment="center"
                    onTap={() => onWhack(index)}
                    isEnabled={gameActive}
                    text={mole ? "🦔" : ""}
                />
            ))}
        </gridLayout>
    );
}