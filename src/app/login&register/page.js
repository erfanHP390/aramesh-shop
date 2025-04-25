import LoginRegister from "@/components/templates/formPage/LoginRegister";

export const metadata = {
  title: "ورود و ثبت نام | قهوه آرامش - حساب کاربری",
  description: "صفحه ورود و ثبت نام در فروشگاه تخصصی قهوه آرامش | دسترسی به تاریخچه خرید، علاقه‌مندی‌ها و تخفیف‌های ویژه",
  keywords: [
    "ورود به حساب آرامش",
    "ثبت نام در آرامش",
    "حساب کاربری قهوه آرامش",
    "لاگین فروشگاه قهوه",
    "عضویت در سایت قهوه",
    "بازیابی رمز عبور",
    "تخفیف‌های ویژه اعضا",
    "تاریخچه خرید قهوه"
  ],
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
    }
  },
  alternates: {
    canonical: "https://aramesh-coffee.com/login-register"
  },
  openGraph: {
    title: "ورود و ثبت نام | قهوه آرامش",
    description: "صفحه حساب کاربری فروشگاه تخصصی قهوه آرامش",
    url: "https://aramesh-coffee.com/login-register",
    type: "website",
    images: [
      {
        url: "https://aramesh-coffee.com/images/login-og.jpg",
        width: 800,
        height: 600,
        alt: "صفحه ورود و ثبت نام آرامش",
      }
    ],
    siteName: "آرامش - فروشگاه تخصصی قهوه"
  }
};

const Login_register = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "ورود و ثبت نام",
    "description": "صفحه حساب کاربری فروشگاه تخصصی قهوه آرامش",
    "url": "https://aramesh-coffee.com/login-register",
    "potentialAction": {
      "@type": "LoginAction",
      "target": "https://aramesh-coffee.com/api/login",
      "method": "POST"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <LoginRegister />
    </>
  );
};

export default Login_register;
