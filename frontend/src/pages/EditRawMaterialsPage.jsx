
import { useEffect } from "react";
import {  useLazyGetSingleRawMaterialQuery, useUpdateRawMaterialMutation } from "../api/productApi";

import { useParams,useLocation } from "react-router-dom";
import AddRawProducts from "../components/productcomponents/AddRawProducts";
function EditRawMaterialsPage() {
  const { branch } = useParams();
  const {state} = useLocation()
  const [singleRaw,{data:rawData}] = useLazyGetSingleRawMaterialQuery()
  const [editRawMaterial, { data, error, isError, isSuccess, isLoading }] =
    useUpdateRawMaterialMutation();

useEffect(()=>{
    singleRaw({branch,id:state.id})
},[])


  return (
    <div>
      <AddRawProducts 
      heading={'Edit Raw Materials'}
      addProduct={editRawMaterial}
      data={data}
      error={error}
      isError={isError}
      isSuccess={isSuccess}
      isLoading={isLoading}
      rawData={rawData}
      path={`/purchase-payment/${branch}`}
      />
    </div>
  )
}

export default EditRawMaterialsPage

