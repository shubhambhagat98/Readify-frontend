import { Banner } from "../components/LandingPage/Banner";
import { Services } from "../components/LandingPage/Services";
import { About } from "../components/LandingPage/About";
import { Team } from "../components/LandingPage/Team";
import { Footer } from "../components/LandingPage/Footer";

export const Home = () => {
  return (
    <>
      <Banner />
      <Services />
      <About />
      <Team />
      <Footer />
    </>
  );
};
