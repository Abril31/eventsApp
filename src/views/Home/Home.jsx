import CategoryBar from "../../components/categoryBar/CategoryBar";
import CardList from "../../components/cardList/CardList";
import Carousel from "../../components/carousel/Carousel";

const Home = () => {
  //Filtros

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex justify-center flex-grow"></div>
      </div>

      <div>
        <Carousel />
        <CategoryBar />
        <h1 className="mx-40 mt-10 mb-4 w-3/12 px-10 font-extrabold text-3xl">
          EVENTS
        </h1>
      </div>

      <div className="flex mx-10 gap-5 text-xl">
        <div className="w-full flex gap-5 justify-center mx-20 mb-5"></div>
      </div>
      <div className="">
        <div className="flex justify-center mb-7 mt-3"></div>
        {/* Aquí vienen las Cards */}
        <div className="flex justify-center">
          <CardList />
        </div>
      </div>
    </>
  );
};

export default Home;
