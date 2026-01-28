export const slideUpVariants = {
    initial: { opacity: 0, y: "20%" },
    animate: { opacity: 1, y: "0%" },
    exit: { opacity: 0, y: "-20%" },
};

export const slideUpTransition = {
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1], // Smooth cubic-bezier
};
