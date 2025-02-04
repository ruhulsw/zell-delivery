import React from "react";
import Article from "../components/Article";

const ArticleScreen = ({ route }) => {
  return <Article article={route.params.content} />;
};

export default ArticleScreen;
