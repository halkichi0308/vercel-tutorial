import { client } from "@/libs/client";
import { Blog } from "@/types/blog";

type Props = {
    blog: Blog[];
};

const BlogId: React.FC<Props> = (blogs) => {
    let blog: Blog = blogs.blog[0];
    let elem: Element;
    return (
        <main>
            <h1>{blog.title}</h1>
            <p>{blog.publishedAt}</p>
            <p>test</p>
            <div
                dangerouslySetInnerHTML={{
                    __html: `${blog.title}`,
                }}
            />
        </main>
    );
};

export default BlogId;

export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "blog" });

    const paths = data.contents.map(
        (content: { id: string }) => `/blog/${content.id}`
    );
    return { paths, fallback: false };
};

export const getStaticProps = async () => {
    const data = await client.get({ endpoint: "blog" });

    return {
        props: {
            blog: data.contents,
        },
    };
};
