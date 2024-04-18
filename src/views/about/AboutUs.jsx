import { AdvancedImage } from "@cloudinary/react";
import mission from "../../assets/images/mission.png";
import story from "../../assets/images/story.png";
import spon from "../../assets/images/ourSpon.png";
import git from "../../assets/icons/git.svg";
import curve1 from "../../assets/icons/curva1.svg";
import curve2 from "../../assets/icons/curva2.svg";
import {
  tech1Img,
  oliviaImg,
  foodLogoImg,
  madisonImg,
  globalImg,
} from "../../configs/cloudinary";

const AboutUs = () => {
  return (
    <>
      <div className="flex flex-col justify-center font-lobster">
        <div className="flex mt-6 mx-28 gap-3">
          <div className="flex justify-end items-center">
            <p className="text-2xl px-28 py-2 w-4/5 font-medium">
              "At <strong>HORIZON EVENTS</strong>, our mission is to connect
              people with unforgettable experiences by providing a platform
              where they can easily discover and access a diverse array of
              events from around the world. We believe in the power of events to
              inspire, entertain, and enrich lives. Our platform serves as a hub
              for individuals seeking to explore and engage with a wide range of
              cultural, entertainment, and educational experiences. Whether it's
              a music concert, a theater performance, a sports match, or a
              culinary festival, we strive to make the process of discovering
              and attending events seamless and enjoyable for our users. Our
              mission is to facilitate connections, foster community, and ensure
              that every ticket purchased leads to an extraordinary and
              memorable experience."
            </p>
            <img src={mission} className="w-1/4" />
          </div>
        </div>
        <div className="flex mt-6 mx-28">
          <div className="flex justify-end items-center">
            <img src={story} className="w-1/4" />
            <p className="text-2xl px-28 py-2 w-4/5 font-medium">
              "Our story is one of passion for the vibrant world of events.
              Founded with the vision of making event experiences accessible to
              all, we embarked on a journey to connect enthusiasts with their
              favorite happenings worldwide. What started as a simple idea
              blossomed into a platform dedicated to providing seamless
              ticketing solutions for every event imaginable. From music
              festivals to sports matches, cultural exhibitions to exclusive
              galas, our commitment remains unwavering: to be the bridge between
              event organizers and attendees, ensuring every ticket sold opens
              the door to unforgettable moments and cherished memories."
            </p>
          </div>
        </div>

        <div className="flex justify-center mx-24 p-5 gap-24 items-center mb-10">
          <p className="text-2xl w-1/2 py-5">
            "We are immensely grateful to our sponsors who make our events
            possible. Their generous support enables us to bring unforgettable
            experiences to our audience and create lasting memories. With their
            dedication and partnership, we are able to continue pushing the
            boundaries of entertainment and innovation. We extend our heartfelt
            thanks to each of our sponsors for their invaluable contribution to
            our success."
          </p>
          <img src={spon} alt="Our Sponsors" className="w-1/4" />
        </div>
        <div className="flex justify-between mx-24 p-4 gap-10">
          <AdvancedImage cldImg={tech1Img} className="w-1/5 h-auto" />
          <AdvancedImage cldImg={foodLogoImg} className="w-1/5 h-auto" />
          <AdvancedImage cldImg={oliviaImg} className="w-1/5 h-auto" />
          <AdvancedImage cldImg={madisonImg} className="w-1/5 h-auto" />
          <AdvancedImage cldImg={globalImg} className="w-1/5 h-auto" />
        </div>
        <div>
          <h1 className="text-4xl mt-24 font-jomhuria font-bold">
            Hello, Nice to meet you!
          </h1>
        </div>

        <div className="flex flex-col mx-28 gap-10 p-10 font-jomhuria text-xl">
          <div className="flex items-center  w-full gap-6">
            <img
              src="https://res.cloudinary.com/dcvxjhqk8/image/upload/v1713310373/leo.png"
              width={200}
              className="rounded-full"
            />
            <div className=" p-10 w-1/2">
              <p className="font-extrabold flex gap-3 mb-3">
                Leodan <img src={git} />
                <a
                  href="https://github.com/LeodanCondori7000"
                  target="_blank"
                  className="italic font-light text-deco"
                >
                  LeodanCondori7000
                </a>
              </p>
              "Seasoned Backend Developer adept at architecting robust and
              scalable server-side solutions. With a strong foundation in
              programming languages like Python, Java, or C#, I specialize in
              building and optimizing databases, APIs, and server infrastructure
              to support complex web applications. Proficient in frameworks such
              Spring Boot, I leverage my expertise to ensure optimal
              performance, security, and reliability of backend systems. From
              designing data models to implementing authentication and
              authorization mechanisms, I am committed to delivering efficient
              and maintainable backend solutions that power seamless user
              experiences."
            </div>
            <div className="flex w-1/2 justify-center">
              <img src={curve1} alt="Curve" className="mt-10" />
            </div>
          </div>
          <div className="flex items-center  w-full gap-6 justify-end">
            <div className="flex w-1/2  justify-center">
              <img src={curve2} alt="Curve" className="mt-10" />
            </div>
            <div className=" p-10 w-1/2">
              <p className="font-extrabold flex gap-3 mb-3">
                Facu <img src={git} />{" "}
                <a
                  href="https://github.com/facuballone"
                  target="_blank"
                  className="italic font-light text-deco"
                >
                  facuballone
                </a>
              </p>
              "I am a dedicated Full Stack Developer with a robust background in
              web development, prioritizing efficient problem-solving and
              optimal solutions. Proficient in JavaScript, I excel in both
              Front-end and Back-end development. My expertise extends to React,
              Node.js, Redux, SQL, and Express, essential tools that I leverage
              to craft diverse and innovative projects. Committed to delivering
              high-quality results, I thrive in collaborative environments where
              I can contribute my skills and creativity to overcome challenges
              effectively. With a passion for continuous learning and a
              meticulous attention to detail, I am dedicated to exceeding
              expectations and driving impactful outcomes in every project I
              undertake."
            </div>

            <img
              src="https://res.cloudinary.com/dcvxjhqk8/image/upload/v1713309870/fotos-team.jpg"
              width={200}
              className="border  rounded-full"
            />
          </div>

          <div className="flex items-center  w-full gap-6">
            <img
              src="https://res.cloudinary.com/dcvxjhqk8/image/upload/v1713329841/umobrvrzzwv6qblq3cbs.jpg"
              width={200}
              className="rounded-full "
            />

            <div className=" p-10 w-1/2">
              <p className="font-extrabold flex gap-3 mb-3">
                Tico <img src={git} />{" "}
                <a
                  href="https://github.com/WOQuintela"
                  target="_blank"
                  className="italic font-light text-deco"
                >
                  WOQuintela
                </a>
              </p>
              "I am a seasoned Full Stack Developer with a wealth of experience
              in PHP, JavaScript, React, and Node.js, complemented by a strong
              foundation in providing comprehensive technical support. Over the
              years, I have honed my skills in troubleshooting and resolving
              issues swiftly, thereby maintaining seamless operations for a wide
              range of web applications. My dedication to problem-solving is
              evident in my proactive approach to identifying and addressing
              challenges, ensuring that projects are delivered on time and
              within budget. With a meticulous eye for detail and a commitment
              to staying updated on the latest technologies, I thrive in dynamic
              environments where innovation and efficiency are paramount. My
              versatility extends to both frontend and backend development,
              allowing me to craft robust, scalable, and user-friendly solutions
              that exceed expectations and drive business growth."
            </div>
            <div className="flex w-1/2 justify-center">
              <img src={curve1} alt="Curve" className="mt-10" />
            </div>
          </div>

          <div className="flex items-center  w-full gap-6 justify-end">
            <div className="flex w-1/2  justify-center">
              <img src={curve2} alt="Curve" className="mt-10" />
            </div>
            <div className=" p-10 w-1/2">
              <p className="font-extrabold flex gap-3 mb-3">
                Abril <img src={git} />{" "}
                <a
                  href="https://github.com/Abril31"
                  target="_blank"
                  className="italic font-light text-deco"
                >
                  Abril31
                </a>
              </p>
              "I am a budding developer with a passion for learning and a
              background in digital customer service platforms. While I may be
              new to programming, my experience in customer service has equipped
              me with strong communication and problem-solving skills. I am
              eager to apply my customer-centric mindset to the world of
              software development, where I can contribute fresh perspectives
              and a dedication to delivering exceptional user experiences. With
              a commitment to continuous growth and a keen interest in
              technology, I am excited to embark on this journey in the realm of
              programming."
            </div>
            <img
              src="https://res.cloudinary.com/dcvxjhqk8/image/upload/v1713329777/ojmrq5wg2pdtlzmc2lrs.jpg"
              width={200}
              className="border  rounded-full"
            />
          </div>
          <div className="flex items-center  w-full gap-6">
            <img
              src="https://res.cloudinary.com/dcvxjhqk8/image/upload/v1713329810/ytrqohck7svndian77jv.jpg"
              width={200}
              className="rounded-full "
            />
            <div className=" p-10 w-1/2">
              <p className="font-extrabold flex gap-3 mb-3">
                Ezequiel <img src={git} />{" "}
                <a
                  href="https://github.com/HeickEzequiel"
                  target="_blank"
                  className="italic font-light text-deco"
                >
                  HeickEzequiel
                </a>
              </p>
              "I am a versatile and disciplined Full Stack Developer,
              specializing in both Front-end and Back-end development. With a
              keen focus on delivering high-quality solutions, I thrive in
              dynamic environments where organization and efficiency are
              paramount. My expertise spans across various technologies,
              including JavaScript frameworks like React for the Front-end and
              Node.js for the Back-end. With a meticulous approach to coding and
              a commitment to best practices, I ensure that every project I
              undertake is executed with precision and attention to detail. With
              strong problem-solving skills and a proactive attitude, I am
              dedicated to driving success and exceeding expectations in every
              aspect of web development."
            </div>
            <div className="flex w-1/2 justify-center">
              <img src={curve1} alt="Curve" className="mt-10" />
            </div>
          </div>
          <div className="flex items-center  w-full gap-6 justify-end">
            <div className="flex w-1/2 justify-center">
              <img src={curve2} alt="Curve" className="mt-10" />
            </div>
            <div className=" p-10 w-1/2">
              <p className="font-extrabold flex gap-3 mb-3">
                Walter <img src={git} />{" "}
                <a
                  href="https://github.com/WGreenwichChaca"
                  target="_blank"
                  className="italic font-light text-deco"
                >
                  WGreenwichChaca
                </a>
              </p>
              "Experienced Web Developer with a passion for crafting elegant and
              efficient solutions. Proficient in front-end and back-end
              development, I specialize in creating responsive and user-friendly
              websites and web applications. Skilled in HTML, CSS, JavaScript,
              and various frameworks such as React and Node.js, I have a proven
              track record of delivering high-quality projects on time and
              within budget. With a keen eye for detail and a commitment to
              staying updated with the latest technologies and trends, I strive
              to create seamless digital experiences that exceed client
              expectations."
            </div>
            <img
              src="https://res.cloudinary.com/dcvxjhqk8/image/upload/v1713329858/gr6tajtefgasfv04ol8v.png"
              width={200}
              className="border rounded-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
