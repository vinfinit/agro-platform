const Index = () => {};

export const getServerSideProps = async (ctx) => {
  return {
    redirect: {
      permanent: false,
      destination: '/dashboard',
    }
  }
};

export default Index;