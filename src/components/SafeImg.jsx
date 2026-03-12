import { useEffect, useState } from 'react';

const DEFAULT_FALLBACK_SRC = '/img-fallback.svg';

export default function SafeImg({
  src,
  alt = '',
  fallbackSrc = DEFAULT_FALLBACK_SRC,
  onError,
  ...rest
}) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  const handleError = (e) => {
    if (typeof onError === 'function') onError(e);
    if (!fallbackSrc) return;
    if (e.currentTarget?.src?.includes(fallbackSrc)) return;
    setCurrentSrc(fallbackSrc);
  };

  return <img src={currentSrc || fallbackSrc} alt={alt} onError={handleError} {...rest} />;
}

