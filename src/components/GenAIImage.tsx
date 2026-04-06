import React, { useState, useEffect } from 'react';
import { generateImage } from '../services/genaiService';
import { motion, AnimatePresence } from 'motion/react';

interface GenAIImageProps {
  prompt: string;
  alt: string;
  className?: string;
  aspectRatio?: "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
  fallback?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

// Simple session-based cache to avoid re-generating on every mount
const imageCache: Record<string, string> = {};

const GenAIImage: React.FC<GenAIImageProps> = ({ 
  prompt, 
  alt, 
  className = "", 
  aspectRatio = "1:1",
  fallback,
  referrerPolicy = "no-referrer"
}) => {
  const [src, setSrc] = useState<string | null>(imageCache[prompt] || null);
  const [loading, setLoading] = useState(!imageCache[prompt]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      if (imageCache[prompt]) return;

      setLoading(true);
      const generatedSrc = await generateImage(prompt, aspectRatio as any);
      
      if (isMounted) {
        if (generatedSrc) {
          imageCache[prompt] = generatedSrc;
          setSrc(generatedSrc);
          setError(false);
        } else {
          setError(true);
          console.warn(`Falling back to original image for prompt: "${prompt}" due to generation failure (likely quota).`);
        }
        setLoading(false);
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [prompt, aspectRatio]);

  const finalSrc = src || fallback;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        {loading && !finalSrc && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-zinc-900"
          >
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
        
        {finalSrc && (
          <motion.img
            key={finalSrc}
            src={finalSrc}
            alt={alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`w-full h-full object-cover ${loading ? 'blur-sm grayscale' : ''}`}
            referrerPolicy={referrerPolicy}
          />
        )}
      </AnimatePresence>

      {loading && finalSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default GenAIImage;
