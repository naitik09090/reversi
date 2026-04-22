import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PassMessage({ message, onDismiss }) {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    className="pass-toast"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.3 }}
                    onClick={onDismiss}
                >
                    ⏩ {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
}