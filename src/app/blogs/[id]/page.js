import BreadCrumb from '@/components/modules/breadcrumb/BreadCrumb'
import Footer from '@/components/modules/Footer/Footer'
import Navbar from '@/components/modules/navbar/Navbar'
import CommentArticle from '@/components/templates/blog/commentArticle/CommentArticle'
import DetailsArticle from '@/components/templates/blog/detailsArticle/DetailsArticle'
import styles from "@/styles/article.module.css"
import BlogModel from "@/models/Blog"
import connectToDB from '@/configs/db'


async function page({params}) {

  connectToDB()

  const id = params.id 

  const blog = await BlogModel.findOne({_id: id}).populate("comments").lean()

  return (
    <>
    <Navbar />
    <BreadCrumb route={'قهوه'} />
    <div className={styles.container}>
        <DetailsArticle blog={JSON.parse(JSON.stringify(blog))} />
        <CommentArticle  comments={JSON.parse(JSON.stringify(blog.comments))} />
    </div>

    <Footer />
</>
  )
}

export default page
