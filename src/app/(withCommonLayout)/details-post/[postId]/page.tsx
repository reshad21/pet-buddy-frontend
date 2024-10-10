import PostDetails from "@/components/modules/details-post/PostDetails";

interface BlogId {
  params: {
    postId: string;
  };
}

const DetailsPage = ({ params }: BlogId) => {
  const { postId } = params;

  return (
    <>
      <PostDetails postId={postId} />
    </>
  );
};

export default DetailsPage;
