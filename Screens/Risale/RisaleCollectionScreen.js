import OneColList from "../../common/components/OneColList";
import {RISALE_COLLECTIONS} from "../../datas/RisaleCollections";
import React from "react";


const RisaleCollectionScreen = ({route}) => {
    return <OneColList data={RISALE_COLLECTIONS[route.params.id]} />
}

export default RisaleCollectionScreen;
