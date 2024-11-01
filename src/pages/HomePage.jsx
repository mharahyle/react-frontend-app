import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import ItemListings from '../components/ItemListings';
import ViewAllItems from '../components/ViewAllItems';

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCards />
      <ItemListings isHome={true} />
      <ViewAllItems />
    </>
  );
};
export default HomePage;
