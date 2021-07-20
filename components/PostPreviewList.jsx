import PostPreviewBlock from "./PostPreviewBlock";

const PostPreviewList = ({ posts }) => {
  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <PostPreviewBlock
          key={post.slug}
          title={post.title}
          description={post.description}
          tags={post.tags}
        />
      ))}
    </div>
  );
};

export default PostPreviewList