import OneColList from "../common/components/OneColList";
import { FAMILY_COLLECTIONS } from "../datas/FamilyCollections";

const FamilyCollectionScreen = ({ route }) => {
  return <OneColList data={FAMILY_COLLECTIONS[route.params.id]} />;
};

export default FamilyCollectionScreen;
