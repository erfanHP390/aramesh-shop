import "./globals.css";
import { Inter } from "next/font/google";
import AOSInit from "@/utils/aos";
import ScrollTopBtn from "@/components/modules/ScrollTopBtn/ScrollTopBtn";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "فروشگاه اینترنتی خرید و فروش قهوه آرامش",
  description: `فروشگاه اینترنتی قهوه آرامش، بهترین مقصد برای خرید و فروش قهوه‌های مرغوب و باکیفیت از سراسر جهان! در این فروشگاه، شما می‌توانید انواع قهوه‌های تازه‌آسیاب‌شده، دانه‌های قهوه، قهوه‌های کپسولی و تجهیزات مرتبط با قهوه را با بهترین قیمت و کیفیت پیدا کنید. قهوه آرامش با ارائه محصولات متنوع و ارسال سریع به سراسر کشور، تجربه‌ای لذت‌بخش از خرید آنلاین قهوه را برای شما فراهم می‌کند.
چه به دنبال قهوه‌های اسپشیالیتی، قهوه‌های ترکیبی یا حتی قهوه‌های بدون کافئین باشید، در فروشگاه اینترنتی قهوه آرامش همه چیز برای عاشقان قهوه فراهم است. با خرید از ما، از تخفیف‌های ویژه، هدایای تبلیغاتی و مشاوره تخصصی برای انتخاب بهترین قهوه بهره‌مند شوید. همین حالا به دنیای طعم‌های بی‌نظیر قهوه وارد شوید و لذت یک فنجان قهوه اصیل را تجربه کنید`,
  icons: {
    icon: "https://www.freeiconspng.com/uploads/coffee-bean-icon-9.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body className={inter.className}>
        <AOSInit />
        {children}
        <ToastContainer />
        <ScrollTopBtn />
      </body>
    </html>
  );
}
