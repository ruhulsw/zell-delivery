import OneColList from "../common/components/OneColList";
import { FAMILY_ARTICLES } from "../datas/FamilyArticles";

const FamilyArticlesScreen = ({ route }) => {
  return <OneColList data={FAMILY_ARTICLES[route.params.id]} />;
};
export default FamilyArticlesScreen;
