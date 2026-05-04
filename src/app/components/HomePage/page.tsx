import ExploreHeading from "./ExploreHeading/page";
import Footer from "./Footer/page";
import Navbar from "./Navbar/page";
import FirstSection from "./sections/firstSection/page";
import SecondSection from "./sections/secondSection/page";
const HomePage = () => {
  return (
    <div className="relative top-0 left-0">
      <ExploreHeading />
      <Navbar />
      <FirstSection/>
        <SecondSection/>
        <Footer/>
    </div>
  );
};

export default HomePage;
