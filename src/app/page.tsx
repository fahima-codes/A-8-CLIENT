import Banner from '@/components/Home/Banner';
import Catagories from '@/components/Home/Catagories';
import FetuerdStudio from '@/components/Home/FetuerdStudio';
import HostGuarantee from '@/components/Home/HostGuarantee';
import HowItWorks from '@/components/Home/HowItWorks';

import React from 'react';

const HomePage = () => {
  return (
    <div>
      <Banner></Banner>
      <FetuerdStudio></FetuerdStudio>
      <Catagories></Catagories>
      <HostGuarantee></HostGuarantee>
      <HowItWorks></HowItWorks>
    </div>
  );
};

export default HomePage;
