'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './SVGctr1.module.css';

// const path = 'M 1360 0 C 1410.81 0 1452 41.1898 1452 92 V 556.039 C 1452 610.64 1502.6911 653.834 1537.2283 696.124 C 1553.3378 715.849 1563 741.046 1563 768.5 V 887.5 C 1563 970.737 1531.7366 1002 1448.5 1002 C 1446.847 1002 1445.203 1001.96 1443.567 1001.9 C 1416.228 1000.74 1387.364 1002 1360 1002 V 1002 H 92 C 41.19 1002 0 960.81 0 910 V 92 C 0 41.1898 41.19 0 92 0 H 1360 Z';
// const pathuse = 'M 1820 0 V 621.5 C 1820 671.704 1820 704 1892.2354 765.7354 C 1920 789 1920 817 1920 845.35 V 1080 H 0 V 0 Z';


export default function SVGCtr1({ children }) {
    const [scalewidth, setScalewidth] = useState(0);
    const [scaleheight, setScaleheight] = useState(0);
    const svgContainerRef = useRef(null);

    const ctr_h = 1080;
    const ctr_w = 1920;


    useEffect(() => {
        const handleResize = () => {
            if (svgContainerRef.current) {
                const containerWidth = svgContainerRef.current.getBoundingClientRect().width;
                const containerHeight = svgContainerRef.current.getBoundingClientRect().height;
                const newScalewidth = containerWidth - ctr_w; // Adjust this factor based on your requirement
                const newScaleheight = containerHeight - ctr_h; // Adjust this factor based on your requirement
                setScalewidth(newScalewidth);
                setScaleheight(newScaleheight);
            }
        };

        // Initial calculation
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div ref={svgContainerRef} className={styles.container}
            style={{
                clipPath: `path('${`M ${1830 + scalewidth} 0 V ${700.5 + scaleheight} c 0 50.204 0 82.5 62.2354 144.2354 c 27.7646 23.2646 27.7646 51.2646 27.7646 79.6146 V ${1080 + scaleheight} H 0 V 0 Z`}')`
            }}>

            {children}
        </div>
    );
}
