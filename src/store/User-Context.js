import { createContext, useMemo, useState } from "react";

const UserContext = createContext({
  userData: {},
  setUserData: (user) => {},
  rating: 0,
  setBookRating: (rating) => {},
  likePercent: [0, 100],
  setLikePercent: (likePercent) => {},
  sortOrder: "default",
  setSortOrder: (order)=>{},
});

export const UserContextProvider = (props) => {
  const [userDataStored, setUserDataStored] = useState(
    JSON.parse(localStorage.getItem("readifyUser"))
  );

  const [ratingStored, setRatingStored] = useState(0);
  const [likePercentStored, setLikePercentStored] = useState([0, 100]);
  const [sortOrderStored, setSortOrderStored] = useState("default");

  const userIsLoggedHandler = (user) => {
    setUserDataStored(user);
  };

  const ratingHandler = (rating) => {
    setRatingStored(rating);
  };

  const likePercentHandler = (likePercent) => {
    setLikePercentStored(likePercent);
  };

  const sortOrderHandler = (order) => {
    setSortOrderStored(order);
  }

  const context = useMemo(
    () => ({
      userData: userDataStored,
      setUserData: userIsLoggedHandler,
      rating: ratingStored,
      setBookRating: ratingHandler,
      likePercent: likePercentStored,
      setLikePercent: likePercentHandler,
      sortOrder: sortOrderStored,
      setSortOrder: sortOrderHandler,
    }),
    [userDataStored, ratingStored, likePercentStored, sortOrderStored]
  );

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
