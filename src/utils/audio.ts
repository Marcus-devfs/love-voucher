
// Sound effect placeholders
// In a real app, these should be local files or reliable CDN links.
// Using reliable placeholders or data URIs where possible.

export const SOUNDS = {
    // CS 1.6 Timer Beep
    BEEP: 'https://raw.githubusercontent.com/KernCore91/-SC-Counter-Strike-1.6-Weapons-Project/main/sound/cs16/c4/beep.wav',
    // Keypad typing / Arming clicks
    PLANTING: 'https://raw.githubusercontent.com/KernCore91/-SC-Counter-Strike-1.6-Weapons-Project/main/sound/cs16/c4/click.wav',
    // "The bomb has been planted" (Radio)
    PLANTED: 'https://raw.githubusercontent.com/KernCore91/-SC-Counter-Strike-1.6-Weapons-Project/main/sound/radio/bombpl.wav',
    // Explosion
    EXPLOSION: 'https://raw.githubusercontent.com/KernCore91/-SC-Counter-Strike-1.6-Weapons-Project/main/sound/cs16/c4/boom.wav',
    // Defuse sounds (using click for now or generic keypad beep)
    DEFUSE: 'https://raw.githubusercontent.com/KernCore91/-SC-Counter-Strike-1.6-Weapons-Project/main/sound/cs16/c4/click.wav',
    // Win sound (CT) - "Counter-Terrorists Win"
    WIN_CT: 'https://raw.githubusercontent.com/KernCore91/-SC-Counter-Strike-1.6-Weapons-Project/main/sound/radio/ctwin.wav',
    // Loss sound (T) - "Terrorists Win"
    WIN_T: 'https://raw.githubusercontent.com/KernCore91/-SC-Counter-Strike-1.6-Weapons-Project/main/sound/radio/terwin.wav',
};

export const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch(e => console.error("Audio play failed", e));
};
