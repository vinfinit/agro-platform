const Index = () => {};

export const getServerSideProps = async (ctx) => {
  ctx.res.writeHead(302, { Location: '/dashboard' }).end()
};

export default Index;