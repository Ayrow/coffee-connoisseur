import { useRouter } from 'next/router';
import Link from 'next/link';

const Dynamicpage = () => {
  const router = useRouter();

  return (
    <div>
      You are on page : {router.query.dynamic}
      <Link href='/'> Link to Home </Link>
    </div>
  );
};

export default Dynamicpage;
