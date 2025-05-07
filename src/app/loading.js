import './Loading.css';

export default function Loading() {
  return (
    <div className="coffee-loader">
      <div className="coffee-cup">
        <div className="coffee-liquid"></div>
      </div>
      
      <div className="steam">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="loader-text">
        <h2>فروشگاه آرامش</h2>
        <p>در حال آماده‌سازی،لطفا منتظر باشید</p>
      </div>

      <div className="progress-container">
        <div className="progress-bar"></div>
      </div>
    </div>
  );
}