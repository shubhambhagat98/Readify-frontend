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
  deleteBookMode : {
    booklistId : 0,
    isDelete: false
  },
  setDeleteBookMode : (booklist) => {},
  lastVisitedList : "0",
  setLastVisitedList : (value) => {}
});

export const UserContextProvider = (props) => {
  const [userDataStored, setUserDataStored] = useState(
    JSON.parse(localStorage.getItem("readifyUser"))
  );

  const [ratingStored, setRatingStored] = useState(0);
  const [likePercentStored, setLikePercentStored] = useState([0, 100]);
  const [sortOrderStored, setSortOrderStored] = useState("default");
  const [deleteBookModeStored, setDeleteBookModeStored] = useState({
    booklistId : "0",
    isDelete: false
  });

  const [lastVisitedListStored, setLastVisitedListStored] = useState("0");

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

  const deleteBookModeHandler = (booklist) => {
    setDeleteBookModeStored(booklist);
  }

  const lastVisitedListHandler = (value) => {
    setLastVisitedListStored(value);
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
      deleteBookMode: deleteBookModeStored,
      setDeleteBookMode: deleteBookModeHandler,
      lastVisitedList: lastVisitedListStored,
      setLastVisitedList: lastVisitedListHandler,
    }),
    [userDataStored, ratingStored, likePercentStored, sortOrderStored, deleteBookModeStored, lastVisitedListStored]
  );

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
