import React from "react";
import HeroSection from "./HeroSection";
import PaginatedBooks from "../books/PaginatedBooks";
import FilterBorrows from "../borrows/FilterBorrows";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FilterBorrows />
      <PaginatedBooks />
    </div>
  );
};

export default Home;
