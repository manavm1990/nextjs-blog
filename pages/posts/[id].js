import Layout from '../../components/layout'
import Head from "next/head"
import Date from "../../components/date"
import utilStyles from "../../styles/utils.module.css"

import {getAllPostIds, getPostData} from "../../lib/posts"

// Use id for individual post data
export async function getStaticProps({params}) {
    const postData = await getPostData(params.id)

    return {
        props: {
            postData
        }
    }
}

// Get the each and every possible 'id'
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths, // Includes 'params'

    // '404' if not found
    fallback: false
  }
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>

            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml}} />
            </article>

            {postData.title}
            <br />
            {postData.id}
            <br />
            <Date dateString={postData.date} />
            <br />
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Layout>
    )
}