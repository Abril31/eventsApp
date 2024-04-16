import { useAllUsers, useGetEventReviews } from "../../hooks/useEvents";
import { SingleRating } from "../rating/Rating";
import Loading from "../spinner/Loading";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const EventReviews = ({ id_event }) => {
  const { data: eventReview, isLoading, error } = useGetEventReviews(id_event);
  const { data: users } = useAllUsers();
  const [showReviews, setShowReviews] = useState(false);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Something went wrong 😿, try later</div>;
  }
  const toggleShowReviews = () => {
    setShowReviews(!showReviews);
  };
  const counter = eventReview.length;
  const filteredUsers = users?.filter((user) =>
    eventReview.some((review) => review.id_user === user.id_user)
  );

  return (
    <div>
      <div className="flex flex-col px-2">
        <div className="flex w-48 text-2xl border-b-4 border-otro cursor-pointer items-center">
          {showReviews ? (
            <div
              className="flex p-2 font-semibold items-center"
              onClick={toggleShowReviews}
            >
              <h2>Reviews </h2>
              <p className="flex px-2 text-xl items-center">[{counter}]</p>
              <span className="pt-2">
                <IoMdArrowDropup size={40} />
              </span>
            </div>
          ) : (
            <div
              className="flex font-semibold text-black items-center"
              onClick={toggleShowReviews}
            >
              <h2 className="">Reviews </h2>
              <p className="flex px-2 text-xl items-center">[{counter}]</p>
              <span className=" pt-2">
                <IoMdArrowDropdown size={40} />
              </span>
            </div>
          )}
        </div>

        {showReviews && (
          <div className="flex w-full justify-center gap-10">
            {eventReview.map((review, index) => {
              const user = filteredUsers.find(
                (user) => user.id_user === review.id_user
              );

              return (
                <div
                  className="flex flex-wrap p-3 mt-10 border-r border-otro rounded justify-center"
                  key={review.id}
                  style={{
                    borderRightWidth: index === eventReview.length - 1 ? 0 : 4,
                  }}
                >
                  <div className="flex flex-col items-center justify-between px-10">
                    <div className="flex flex-col justify-center items-center gap-5 ">
                      <img
                        src={user.image}
                        alt={user.username}
                        className="w-20 h-20 rounded-full"
                      />
                      <span className="flex justify-center ml-2 text-deco font-extrabold">
                        {user.name}
                      </span>
                    </div>

                    <p className="w-56 italic text-2xl mt-6">
                      "{review.comment}"
                    </p>
                    <span className="mt-5">
                      <SingleRating value={review.value} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventReviews;
