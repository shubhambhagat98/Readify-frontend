import { BookDetails } from "../components/Common/BookDetails";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { baseUrl } from "../baseUrl";

export const BookData = () => {
  const { id } = useParams();

  const [book, setBook] = useState();

  const getBook = async () => {
    try {
      const response = await fetch(baseUrl + `/bookdata?id=${id}`);
      if (response.status === 200) {
        const data = await response.json();
        setBook(data.book);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setBook(null);
    getBook();
  }, [id]);

  return (
    <Container maxWidth="xl">{book && <BookDetails book={book} />}</Container>
  );
};
