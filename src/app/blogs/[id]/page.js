import BreadCrumb from '@/components/modules/breadcrumb/BreadCrumb'
import Footer from '@/components/modules/Footer/Footer'
import Navbar from '@/components/modules/navbar/Navbar'
import CommentArticle from '@/components/templates/blog/commentArticle/CommentArticle'
import DetailsArticle from '@/components/templates/blog/detailsArticle/DetailsArticle'
import styles from "@/styles/article.module.css"

function page() {
  return (
    <>
    <Navbar />
    <BreadCrumb route={'قهوه'} />
    <div className={styles.container}>
        <DetailsArticle />
        <CommentArticle />
    </div>

    <Footer />
</>
  )
}

export default page
