import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Accomodation from "../../components/Accomodation";
import Help from "../../components/Help";
import Customers from "../../components/Customers";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Accomodation text="Latest Accomodations" />
      <Help />
      <Customers />
      <Footer />
    </>
  );
};

export default Home;
