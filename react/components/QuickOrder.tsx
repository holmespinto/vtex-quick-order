import React, { useEffect, useState } from 'react'
import { useMutation, useLazyQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { Image } from 'vtex.store-image'
import UPDATE_CART from '../graphql/updateCart.graphql'
import GET_PRODUCT from '../graphql/getProductBySku.graphql'

//const styleForm = { flex: 1, alignItems: 'center', justifyContent: 'center' }
/*
const styleBtn = {
  padding: '0 2em 2em',
  borderBottomLeftRradius: '0.5em',
  borderBottomRightRadius: '0.5em',
  transition: 'all 0.5s ease-in-out',
  transformOrigin: 'top',
  overflow: 'hidden',
  marginTop: '-1px',
  background: 'gray',
}
*/
const QuickOrder = () => {
  const [InpuText, setInpuText] = useState(0)
  const [search, setSearch] = useState(0)
  const [addToCart] = useMutation(UPDATE_CART)
  const [getProductData, { data: product }] = useLazyQuery(GET_PRODUCT)
  const CSS_HANDLES = [
    'form',
    'loadingFormContainer',
    'containerDeliveryLogo',
    'containerImageLoadingForm',
    "container_input",
    "item_title",
    "fieldName",
    "fieldName_area",
    "btnSend",
  ];
  const handles = useCssHandles(CSS_HANDLES);
  const handleChange = (e: any) => {
    console.log('InpuText es', e.target.value)
    setInpuText(e.target.value)
  }

  const addProductToCart = () => {
    // Ingresar declaracion de la mutacion

    getProductData({
      variables: {
        sku: InpuText,
      },
    })
  }

  const searchProdcut = (e: any) => {
    e.preventDefault()
    if (!InpuText) {
      alert('Ingrese algo')
    } else {
      setSearch(InpuText)
      addProductToCart()
    }
  }

  useEffect(() => {
    console.log(`El resultado de mi producto es${product}`, search)

    if (product) {
      alert('Ingrese algo')
    } else {
      // const { productId } = product.product
      const skuId = Number(InpuText)

      addToCart({
        variables: {
          salesChannel: '1',
          items: [
            {
              id: skuId,
              quantity: 1,
              seller: '1',
            },
          ],
        },
      }).then(() => {
        window.location.href = '/checkout'
      })
    }
  }, [product, search])

  return (
    <div
      className={`${handles.loadingFormContainer} flex flex-column justify-center w-80 center`}
    >
      <label className={handles.item_title}>Compra Rápida en VTEX</label>
      <div className={`center ${handles.containerDeliveryLogo} ${handles.containerImageLoadingForm}`}>
        <Image   alt=""  src="./check-icon.jpg" />
      </div>
      <form onSubmit={searchProdcut} className={handles.loadingFormContainer}>
        <div className={handles.container_input}>
          <label className={handles.item_title}>Digite el SKU:</label>
        <input id="sku" type="text" onChange={handleChange} className={handles.container_input}/><input type="submit" value="ADD" className={handles.btnSend}  />
        </div>
        <br />
      </form>
    </div>
  )
}

export default QuickOrder
