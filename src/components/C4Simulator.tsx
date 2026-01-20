"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SOUNDS, playSound } from '@/utils/audio';

type GameState = 'IDLE' | 'PLANTING' | 'PLANTED' | 'DEFUSED' | 'EXPLODED';

export default function C4Simulator() {
    const [gameState, setGameState] = useState<GameState>('IDLE');
    const [timeMs, setTimeMs] = useState(40000);

    const [plantProgress, setPlantProgress] = useState(0);
    const [inputCode, setInputCode] = useState('');
    const [isPlantUnlocked, setIsPlantUnlocked] = useState(false);

    const plantIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const beepTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Refined constants
    const DEFUSE_CODE = '7355';
    const PLANT_DURATION = 3000;

    // --- Planting Logic ---
    const startPlanting = () => {
        if (gameState !== 'IDLE' || !isPlantUnlocked) return;
        setGameState('PLANTING');
        playSound(SOUNDS.PLANTING);

        const startTime = Date.now();
        plantIntervalRef.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / PLANT_DURATION) * 100, 100);
            setPlantProgress(progress);

            // Texture sound effect every ~300ms
            if (Math.floor(elapsed / 300) > Math.floor((elapsed - 50) / 300)) {
                playSound(SOUNDS.PLANTING);
            }

            if (progress >= 100) {
                completePlant();
            }
        }, 50);
    };

    const stopPlanting = () => {
        if (gameState !== 'PLANTING') return;
        if (plantIntervalRef.current) clearInterval(plantIntervalRef.current);
        setGameState('IDLE');
        setPlantProgress(0);
    };

    const completePlant = () => {
        if (plantIntervalRef.current) clearInterval(plantIntervalRef.current);
        setGameState('PLANTED');
        playSound(SOUNDS.PLANTED);
        setInputCode(''); // Clear code for defuse phase
    };

    // --- Timer Logic ---
    useEffect(() => {
        if (gameState === 'PLANTED') {
            timerIntervalRef.current = setInterval(() => {
                setTimeMs(prev => {
                    if (prev <= 0) {
                        handleExplosion();
                        return 0;
                    }
                    return prev - 100;
                });
            }, 100);
        } else {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        }

        return () => {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        };
    }, [gameState]);

    // --- Beep Logic (CS Style Acceleration) ---
    const timeMsRef = useRef(timeMs);
    useEffect(() => { timeMsRef.current = timeMs; }, [timeMs]);

    useEffect(() => {
        if (gameState !== 'PLANTED') {
            if (beepTimeoutRef.current) clearTimeout(beepTimeoutRef.current);
            return;
        }

        const loop = () => {
            const t = timeMsRef.current;
            if (t <= 0) return;

            playSound(SOUNDS.BEEP);

            // CS 1.6 Bomb Timer Pattern Approximation
            let delay = 1000;

            if (t > 30000) {
                delay = 1000;
            } else if (t > 20000) {
                delay = 800;
            } else if (t > 10000) {
                const ratio = (t - 10000) / 10000;
                delay = 400 + (ratio * 400);
            } else if (t > 5000) {
                const ratio = (t - 5000) / 5000;
                delay = 200 + (ratio * 200);
            } else if (t > 2000) {
                const ratio = (t - 2000) / 3000;
                delay = 100 + (ratio * 100);
            } else {
                delay = 70;
            }

            beepTimeoutRef.current = setTimeout(loop, delay);
        };

        loop();

        return () => {
            if (beepTimeoutRef.current) clearTimeout(beepTimeoutRef.current);
        };
    }, [gameState]);

    const handleExplosion = () => {
        setGameState('EXPLODED');
        playSound(SOUNDS.EXPLOSION);
        playSound(SOUNDS.WIN_T);
    };

    // --- Keypad Logic (Plant & Defuse) ---
    const handleKeypadPress = (key: string) => {
        // Allow typing in IDLE (to unlock plant) or PLANTED (to defuse)
        if (gameState !== 'IDLE' && gameState !== 'PLANTED') return;

        playSound(SOUNDS.DEFUSE); // Click sound
        if (key === 'C') {
            setInputCode('');
            return;
        }

        const newCode = inputCode + key;
        setInputCode(newCode);

        // Check Code
        if (newCode === DEFUSE_CODE) {
            if (gameState === 'IDLE') {
                setIsPlantUnlocked(true);
                setInputCode('');
            } else if (gameState === 'PLANTED') {
                handleDefuse();
            }
        } else if (newCode.length >= DEFUSE_CODE.length) {
            // Wrong code
            setInputCode('');
        }
    };

    const handleDefuse = () => {
        setGameState('DEFUSED');
        // Play "Bomb Defused" or similar if we had it.
        // For now, Counter-Terrorists Win covers it.
        // Actually, user asked for "Bomb defused" sound. 
        // We only have WIN_CT which is "Counter-Terrorists Win".
        // Let's rely on WIN_CT as per requirements or generic defuse sound.
        playSound(SOUNDS.WIN_CT);
    };

    // --- Render ---
    return (
        <div className={`relative w-full max-w-lg mx-auto bg-stone-800 p-6 rounded-xl border-4 border-stone-900 shadow-2xl flex flex-col items-center gap-6 select-none ${gameState === 'EXPLODED' ? 'animate-shake' : ''}`}>
            {/* Screws */}
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-stone-600 shadow-inner"></div>
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-stone-600 shadow-inner"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-stone-600 shadow-inner"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-stone-600 shadow-inner"></div>

            {/* Screen Area */}
            <div className={`w-full bg-black border-4 border-stone-700 rounded-lg p-4 min-h-[120px] flex flex-col items-center justify-center relative overflow-hidden scanlines shadow-[inset_0_0_20px_rgba(0,0,0,1)]`}>
                {gameState === 'EXPLODED' && (
                    <div className="absolute inset-0 bg-red-600 opacity-50 z-0 animate-pulse"></div>
                )}

                {/* Status Text */}
                <div className="z-10 text-xl font-military tracking-widest text-stone-500 mb-2">
                    {gameState === 'IDLE' && !isPlantUnlocked && 'ENTER CODE TO ARM'}
                    {gameState === 'IDLE' && isPlantUnlocked && 'READY TO PLANT'}
                    {gameState === 'PLANTING' && 'ARMING...'}
                    {gameState === 'PLANTED' && 'ARMED'}
                    {gameState === 'DEFUSED' && 'BOMB DEFUSED'}
                    {gameState === 'EXPLODED' && 'DETONATION'}
                </div>

                {/* Main Display */}
                <div className={`z-10 text-6xl font-digital tracking-widest ${gameState === 'DEFUSED' ? 'text-neon-blue text-blue-400' : 'text-neon-red text-red-500'}`}>
                    {gameState === 'EXPLODED'
                        ? 'ERR_00'
                        : gameState === 'DEFUSED'
                            ? 'SAFE'
                            : gameState === 'IDLE'
                                ? (isPlantUnlocked ? 'ARMED' : '----')
                                : (timeMs / 1000).toFixed(2).replace('.', ':')
                    }
                </div>

                {/* Win Message */}
                {(gameState === 'EXPLODED' || gameState === 'DEFUSED') && (
                    <div className={`absolute bottom-2 text-lg font-bold tracking-widest ${gameState === 'DEFUSED' ? 'text-blue-500' : 'text-red-500'}`}>
                        {gameState === 'DEFUSED' ? 'COUNTER-TERRORISTS WIN' : 'TERRORISTS WIN'}
                    </div>
                )}
            </div>

            {/* Control Area */}
            <div className="w-full flex-grow flex flex-col items-center gap-4">

                {/* Plant Button - Only if Unlocked */}
                {(gameState === 'IDLE' && isPlantUnlocked) || gameState === 'PLANTING' ? (
                    <button
                        className="w-48 h-48 rounded-full bg-gradient-to-br from-red-800 to-red-600 border-8 border-red-900 shadow-lg active:scale-95 transition-transform flex items-center justify-center relative overflow-hidden group"
                        onMouseDown={startPlanting}
                        onMouseUp={stopPlanting}
                        onMouseLeave={stopPlanting}
                        onTouchStart={startPlanting}
                        onTouchEnd={stopPlanting}
                    >
                        <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition-opacity"></div>
                        <span className="text-3xl font-military text-red-950 font-bold z-10 drop-shadow-md">PLANT</span>
                    </button>
                ) : null}

                {/* Plant Progress Bar */}
                {gameState === 'PLANTING' && (
                    <div className="w-64 h-4 bg-black rounded-full overflow-hidden border border-stone-600">
                        <div
                            className="h-full bg-yellow-500 transition-all duration-75 ease-linear"
                            style={{ width: `${plantProgress}%` }}
                        ></div>
                    </div>
                )}

                {/* Keypad - Visible in IDLE (to arm) and PLANTED (to defuse) */}
                {(gameState === 'IDLE' || gameState === 'PLANTED' || gameState === 'DEFUSED') && (
                    (!isPlantUnlocked || gameState === 'PLANTED' || gameState === 'DEFUSED') ? (
                        <div className="grid grid-cols-3 gap-2 p-4 bg-stone-700 rounded-lg shadow-inner">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0].map((k) => (
                                <button
                                    key={k}
                                    className={`w-16 h-12 rounded bg-stone-800 border-b-4 border-stone-950 text-stone-300 font-digital text-2xl active:border-b-0 active:translate-y-1 transition-all ${k === 'C' ? 'bg-red-900/50 text-red-200' : ''}`}
                                    onClick={() => handleKeypadPress(k.toString())}
                                    disabled={gameState === 'DEFUSED' || (gameState === 'IDLE' && isPlantUnlocked)}
                                >
                                    {k}
                                </button>
                            ))}
                        </div>
                    ) : null
                )}

                {/* Code Input Display */}
                {(gameState === 'IDLE' || gameState === 'PLANTED') && (
                    (!isPlantUnlocked || gameState === 'PLANTED') && (
                        <div className="h-10 w-48 bg-black/50 border border-stone-600 rounded flex items-center justify-center text-green-500 font-digital text-2xl tracking-widest">
                            {inputCode.padEnd(4, '_')}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
