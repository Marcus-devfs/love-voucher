
// Sound effect placeholders
// In a real app, these should be local files or reliable CDN links.
// Using reliable placeholders or data URIs where possible.

export const SOUNDS = {
    // Short digital beep
    BEEP: 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3',
    // Mechanical clicking/planting sound
    PLANTING: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3', // Generic click
    // Bomb has been planted (phrase) - opting for a sound effect instead
    PLANTED: 'https://assets.mixkit.co/active_storage/sfx/1609/1609-preview.mp3', // Activation sound
    // Explosion
    EXPLOSION: 'https://assets.mixkit.co/active_storage/sfx/398/398-preview.mp3',
    // Defuse tool / typing sound
    DEFUSE: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Typing beep
    // Win sound (CT)
    WIN_CT: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3', // Success chime
    // Loss sound (T) - same as explosion usually, but maybe a vocal
    WIN_T: 'https://assets.mixkit.co/active_storage/sfx/398/398-preview.mp3',
};

export const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch(e => console.error("Audio play failed", e));
};
