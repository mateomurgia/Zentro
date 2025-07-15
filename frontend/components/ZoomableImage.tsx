import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

const ZoomableImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [showZoom, setShowZoom] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowZoom(false);
    };
    if (showZoom) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showZoom]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={() => setShowZoom(true)}
        className="h-12 w-12 object-contain border rounded-xl shadow cursor-pointer transition hover:opacity-80"
      />
      <AnimatePresence>
        {showZoom && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowZoom(false)}
          >
            <button
              onClick={() => setShowZoom(false)}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-red-100 transition z-50"
              aria-label="Cerrar"
            >
              <XMarkIcon className="h-5 w-5 text-gray-700" />
            </button>
            <motion.img
              src={src}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={() => setShowZoom(false)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-xl border bg-white"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ZoomableImage;
