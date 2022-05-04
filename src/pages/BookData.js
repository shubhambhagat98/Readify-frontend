import { BookDetails } from "../components/Common/BookDetails";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { baseUrl } from "../baseUrl";

export const BookData = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState();

  const getBook = async () => {
    try {
      const response = await fetch(baseUrl+`/bookdata?id=${id}`);
      if (response.status === 200) {
        const data = await response.json();
        setBook(data.book);
        console.log(typeof data.book);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getBook();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section>
        <h1>Loading......</h1>
      </section>
    );
  }

  return (
    <Container maxWidth="xl">{book && <BookDetails book={book} />}</Container>
  );
};
