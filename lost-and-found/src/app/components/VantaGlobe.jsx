'use client'
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import BIRDS from 'vanta/dist/vanta.birds.min';

function VantaGlobe() {
  const vantaRef = useRef(null);

  useEffect(() => {
    if (vantaRef.current) {
      const vantaEffect = BIRDS({
        el: vantaRef.current,
      });

      return () => {
        if (vantaEffect) vantaEffect.destroy();
      };
    }
  }, []);

  return (
    <div ref={vantaRef} style={{ height: '500px' }}>
      {/* Your other content */}
    </div>
  );
}

export default VantaGlobe;