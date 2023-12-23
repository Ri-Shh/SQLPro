import React from "react";
import styles from './Output.module.css';
import { useRef, useEffect } from "react";
import CSV from './CSV.js';

function Output(props) {
    const ref = useRef(null);
    const refTop = useRef(null);

    useEffect(() => {
        if(props.run === 0) return;         // refs would be null
        
        const resizeableEle = ref.current;
        const sty1 = window.getComputedStyle(resizeableEle);
        let height = parseInt(sty1.height, 10);
        let y = 0;
        
        // Top resize
        const onMouseMoveTopResize = (event) => {
            const dy = event.clientY - y;
            height = height - dy;
            y = event.clientY;
            resizeableEle.style.height = `${height}px`;
        };
    
        const onMouseUpTopResize = (event) => {
            document.removeEventListener("mousemove", onMouseMoveTopResize);
        };
    
        const onMouseDownTopResize = (event) => {
            y = event.clientY;
            const sty = window.getComputedStyle(resizeableEle);
            resizeableEle.style.bottom = sty.bottom;
            resizeableEle.style.top = null;
            document.addEventListener("mousemove", onMouseMoveTopResize);
            document.addEventListener("mouseup", onMouseUpTopResize);
        };

        // Add mouse down(mouse-press) event listener
        const resizerTop = refTop.current;
        resizerTop.addEventListener("mousedown", onMouseDownTopResize);

        return () => {
            resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
        };
    }, []);


    return (
        <>
            {props.run > 0 && (
                <div className={styles.output} ref={ref}>
                    <div className={styles.closeButton} onClick={() => props.setRun(0)}>
                    <span>X</span>
                    </div>
                    <div className={styles.resizer} ref={refTop} />
                    <CSV run={props.run} csvData={props.csvData} setCsvData={props.setCsvData} />
                </div>
            )}
        </>
    );

}


export default Output;

