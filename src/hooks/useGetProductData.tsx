import { getDocs } from "firebase/firestore";
import { ProductType, setProducts } from "../features/cartState/cartSlice.tsx";
import React from "react";
import { colRef } from "../App.tsx";
import { useAppDispatch } from "../hooks.tsx";
import { getProduct } from "../tabs/shop.tsx";

export default function useGetProductData(refresh: number) {
  let dispatch = useAppDispatch();

  React.useEffect(() => {
    // Get collection data
    getDocs(colRef)
      .then((snapshot) => {
        let products: ProductType[] = [];

        snapshot.docs.forEach((doc) => {
          let docData = doc.data();

          let product = getProduct(doc.id);

          let newProduct: ProductType = {
            title: product.title,
            description: product.description,
            id: product.id,
            quantity: docData["stock"],
            image: product.image,
            price: product.price,
          };

          products.push(newProduct);
        });

        dispatch(setProducts(products));
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);
}
