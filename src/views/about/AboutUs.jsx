import mission from "../../assets/images/mission.png";
import story from "../../assets/images/story.png";

const AboutUs = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex mt-6 mx-28 gap-3">
        <div className="flex justify-end items-center">
          <p className="text-xl px-28 py-2 w-4/5 font-lobster font-medium">
            "At EventApp, our mission is to connect people with unforgettable
            experiences by providing a platform where they can easily discover
            and access a diverse array of events from around the world. We
            believe in the power of events to inspire, entertain, and enrich
            lives. Our platform serves as a hub for individuals seeking to
            explore and engage with a wide range of cultural, entertainment, and
            educational experiences. Whether it's a music concert, a theater
            performance, a sports match, or a culinary festival, we strive to
            make the process of discovering and attending events seamless and
            enjoyable for our users. Our mission is to facilitate connections,
            foster community, and ensure that every ticket purchased leads to an
            extraordinary and memorable experience."
          </p>
          <img src={mission} width={500} height={500} className="" />
        </div>
      </div>
      <div className="flex mt-6 mx-28">
        <div className="flex justify-end items-center">
          <img src={story} width={500} height={500} className="" />
          <p className="text-xl px-28 py-2 w-4/5 font-lobster font-medium">
            "Our story is one of passion for the vibrant world of events.
            Founded with the vision of making event experiences accessible to
            all, we embarked on a journey to connect enthusiasts with their
            favorite happenings worldwide. What started as a simple idea
            blossomed into a platform dedicated to providing seamless ticketing
            solutions for every event imaginable. From music festivals to sports
            matches, cultural exhibitions to exclusive galas, our commitment
            remains unwavering: to be the bridge between event organizers and
            attendees, ensuring every ticket sold opens the door to
            unforgettable moments and cherished memories."
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AboutUs;
