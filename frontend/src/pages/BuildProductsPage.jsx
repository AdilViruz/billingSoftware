import {
  useDeleteBuildProductsMutation,
  useGetBuildProductsQuery,
  useLazyGetSingleBuildProductsQuery,
  useUpdateBuildProductsMutation,
} from "../api/productApi";
import ListProducts from "../components/productcomponents/ListProducts";
import { useParams } from "react-router-dom";
import ProductModals from "../modals/ProductModals";
import { useState } from "react";
import DeleteAlertModal from "../modals/DeleteAlertModal";

function BuildProductsPage() {
  const { branch } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [productId, setProductId] = useState("");

  const { data, isLoading } = useGetBuildProductsQuery(branch);
  const [singleBuildProduct,{ data: singleData }] = useLazyGetSingleBuildProductsQuery();

  const [
    updateBuildProduct,
    { data: updateData, error, isError, isSuccess, isLoading: isUpdateLoading },
  ] = useUpdateBuildProductsMutation();
  const [
    deleteBuildProduct,
    {
      data: deleteData,
      error: deleteError,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
    },
  ] = useDeleteBuildProductsMutation();

  return (
    <div>
      <ListProducts
        title="Build Products"
        data={data}
        isLoading={isLoading}
        setShowModal={setShowModal}
        setEditModal={setEditModal}
        setProductId={setProductId}
        setDeleteModal={setDeleteModal}
        singleBuildProduct={singleBuildProduct}
        path={`/add-build-products/${branch}`}
      />

      {/* View product */}
      <ProductModals
        heading="View build product"
        show={showModal}
        onHide={() => setShowModal(false)}
        productId={productId}
        data={singleData}
        disable={true}
      />

      {/* Edit Product */}
      <ProductModals
        heading="Edit build product"
        show={editModal}
        onHide={() => setEditModal(false)}
        productId={productId}
        data={singleData}
        disable={false}
        updateProduct={updateBuildProduct}
        updateData={updateData}
        error={error}
        isError={isError}
        isSuccess={isSuccess}
        isUpdateLoading={isUpdateLoading}
        setEditModal={setEditModal}
      />

      {/* Delete Product */}
      <DeleteAlertModal
       show={deleteModal}
       setShow={setDeleteModal}
       onHide={() => setDeleteModal(false)}
       deleteBuildProduct={deleteBuildProduct}
       data={deleteData}
       error={deleteError}
       isError={isDeleteError}
       isSuccess={isDeleteSuccess}
       isLoading={isDeleteLoading}
       productId={productId}
      />
    </div>
  );
}

export default BuildProductsPage;
