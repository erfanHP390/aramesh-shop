"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./MultiRangeSlider.module.css";

const MultiRangeSlider = ({ min, max, onChange }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const rangeRef = useRef(null);
    const minThumbRef = useRef(null);
    const maxThumbRef = useRef(null);
    const sliderRef = useRef(null);

    // تبدیل مقدار به درصد با محدودیت‌های صحیح
    const getPercent = useCallback(
        (value) => Math.min(Math.max(Math.round(((value - min) / (max - min)) * 100), 0), 100),
        [min, max]
    );

    // بروزرسانی موقعیت نوار انتخاب
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxVal);

        if (rangeRef.current) {
            rangeRef.current.style.right = `${100 - maxPercent}%`;
            rangeRef.current.style.left = `${minPercent}%`;
        }
    }, [minVal, maxVal, getPercent]);

    // ارسال تغییرات به والد
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);

    // هندلرهای حرکت برای دستگیره حداقل
    const handleMinMouseDown = (e) => {
        e.preventDefault();
        document.addEventListener('mousemove', handleMinMove);
        document.addEventListener('mouseup', handleMinUp);
        document.addEventListener('touchmove', handleMinTouchMove);
        document.addEventListener('touchend', handleMinTouchEnd);
    };

    const handleMinMove = (e) => {
        updateMinValue(e.clientX);
    };

    const handleMinTouchMove = (e) => {
        updateMinValue(e.touches[0].clientX);
    };

    const updateMinValue = (clientX) => {
        if (!sliderRef.current) return;
        
        const sliderRect = sliderRef.current.getBoundingClientRect();
        const newPercent = (sliderRect.right - clientX) / sliderRect.width;
        const newValue = Math.round(min + Math.min(Math.max(newPercent, 0), (maxVal - min) / (max - min)) * (max - min));
        
        if (newValue < maxVal) {
            setMinVal(newValue);
        }
    };

    const handleMinUp = () => {
        document.removeEventListener('mousemove', handleMinMove);
        document.removeEventListener('mouseup', handleMinUp);
        document.removeEventListener('touchmove', handleMinTouchMove);
        document.removeEventListener('touchend', handleMinTouchEnd);
    };

    const handleMinTouchEnd = handleMinUp;

    // هندلرهای حرکت برای دستگیره حداکثر
    const handleMaxMouseDown = (e) => {
        e.preventDefault();
        document.addEventListener('mousemove', handleMaxMove);
        document.addEventListener('mouseup', handleMaxUp);
        document.addEventListener('touchmove', handleMaxTouchMove);
        document.addEventListener('touchend', handleMaxTouchEnd);
    };

    const handleMaxMove = (e) => {
        updateMaxValue(e.clientX);
    };

    const handleMaxTouchMove = (e) => {
        updateMaxValue(e.touches[0].clientX);
    };

    const updateMaxValue = (clientX) => {
        if (!sliderRef.current) return;
        
        const sliderRect = sliderRef.current.getBoundingClientRect();
        const newPercent = (sliderRect.right - clientX) / sliderRect.width;
        const newValue = Math.round(min + Math.min(Math.max(newPercent, (minVal - min) / (max - min)), 1) * (max - min));
        
        if (newValue > minVal) {
            setMaxVal(newValue);
        }
    };

    const handleMaxUp = () => {
        document.removeEventListener('mousemove', handleMaxMove);
        document.removeEventListener('mouseup', handleMaxUp);
        document.removeEventListener('touchmove', handleMaxTouchMove);
        document.removeEventListener('touchend', handleMaxTouchEnd);
    };

    const handleMaxTouchEnd = handleMaxUp;

    // فرمت قیمت به فارسی
    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price) + " تومان";
    };

    return (
        <div className={styles.container}>
            <div className={styles.priceDisplay}>
                <span className={styles.priceLabel}>حداقل: {formatPrice(minVal)}</span>
                <span className={styles.priceLabel}>حداکثر: {formatPrice(maxVal)}</span>
            </div>
            
            <div ref={sliderRef} className={styles.slider}>
                <div className={styles.track}></div>
                <div ref={rangeRef} className={styles.range}></div>
                <div
                    ref={minThumbRef}
                    className={styles.thumb}
                    style={{ right: `${getPercent(minVal)}%` }}
                    onMouseDown={handleMinMouseDown}
                    onTouchStart={handleMinMouseDown}
                />
                <div
                    ref={maxThumbRef}
                    className={styles.thumb}
                    style={{ right: `${getPercent(maxVal)}%` }}
                    onMouseDown={handleMaxMouseDown}
                    onTouchStart={handleMaxMouseDown}
                />
            </div>
        </div>
    );
};

export default MultiRangeSlider;