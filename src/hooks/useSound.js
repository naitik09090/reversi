import { useCallback, useRef } from 'react';

/**
 * Simple Web Audio API sound effects — no external files needed.
 */
export function useSound() {
    const ctx = useRef(null);

    function getCtx() {
        if (!ctx.current) {
            ctx.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        return ctx.current;
    }

    const playPlace = useCallback(() => {
        try {
            const ac = getCtx();
            const osc = ac.createOscillator();
            const gain = ac.createGain();
            osc.connect(gain);
            gain.connect(ac.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, ac.currentTime);
            osc.frequency.exponentialRampToValueAtTime(220, ac.currentTime + 0.1);
            gain.gain.setValueAtTime(0.15, ac.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.2);
            osc.start(ac.currentTime);
            osc.stop(ac.currentTime + 0.2);
        } catch { }
    }, []);

    const playFlip = useCallback(() => {
        try {
            const ac = getCtx();
            const osc = ac.createOscillator();
            const gain = ac.createGain();
            osc.connect(gain);
            gain.connect(ac.destination);
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(660, ac.currentTime);
            osc.frequency.exponentialRampToValueAtTime(330, ac.currentTime + 0.08);
            gain.gain.setValueAtTime(0.08, ac.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.15);
            osc.start(ac.currentTime);
            osc.stop(ac.currentTime + 0.15);
        } catch { }
    }, []);

    const playWin = useCallback(() => {
        try {
            const ac = getCtx();
            const notes = [523, 659, 784, 1047];
            notes.forEach((freq, i) => {
                const osc = ac.createOscillator();
                const gain = ac.createGain();
                osc.connect(gain);
                gain.connect(ac.destination);
                osc.type = 'sine';
                osc.frequency.value = freq;
                const t = ac.currentTime + i * 0.12;
                gain.gain.setValueAtTime(0.12, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
                osc.start(t);
                osc.stop(t + 0.3);
            });
        } catch { }
    }, []);

    return { playPlace, playFlip, playWin };
}