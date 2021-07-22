import PostPreviewBlock from "./PostPreviewBlock";

const PostPreviewList = ({ posts, locale }) => {
  return (
    <div className="flex flex-col gap-y-12">
      {posts.map((post) => (
        <PostPreviewBlock
          key={post.slug}
          title={post.title}
          description={post.description}
          tags={post.tags}
          slug={post.slug}
          locale={locale}
        />
      ))}
    </div>
  );
};

export default PostPreviewList