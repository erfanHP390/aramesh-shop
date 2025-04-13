// app/loading.js
import './Loading.css';

export default function Loading() {
  return (
    <div className="coffee-loader">
      {/* فنجان قهوه */}
      <div className="coffee-cup">
        <div className="coffee-liquid"></div>
      </div>
      
      {/* بخار قهوه */}
      <div className="steam">
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* متن */}
      <div className="loader-text">
        <h2>فروشگاه آرامش</h2>
        <p>در حال آماده‌سازی  ...</p>
      </div>

      {/* نوار پیشرفت */}
      <div className="progress-container">
        <div className="progress-bar"></div>
      </div>
    </div>
  );
}