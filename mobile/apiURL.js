export const localhost ='https://gw-future-house.herokuapp.com'
// export const localhost ='http://192.168.1.6:8000'
const apiURL ='/api'
export const endpoint =`${localhost}${apiURL}`

export const productListURL=`${endpoint}/products/`;
export const postBlogURL = `${endpoint}/post-list/`;
export const productDetailURL= id=> `${endpoint}/products/${id}/`;
export const commentURL = id=>`${endpoint}/comment/${id}/`;
export const commentReplyURL = id=>`${endpoint}/comment-reply/${id}/`;
export const orderSummaryURL = `${endpoint}/order-summary/`;
export const userIDURL = `${endpoint}/user-id/`;
export const authUserURL = `${localhost}/rest-auth/user/`;
export const userUpdateURL =id=> `${endpoint}/user/${id}/update/`;
export const orderItemDeleteURL =id=> `${endpoint}/order-items/${id}/delete/`;
export const addCoupontURL = `${endpoint}/add-coupon/`;
export const postCommentURL = `${endpoint}/post-comment/`;
export const paymentListURL = `${endpoint}/payments/`;
export const addToCartURL=`${endpoint}/add-to-cart/`;
export const postDetailBlogURL = id=> `${endpoint}/post/${id}/`;
export const addWishlistURL =id=>`${endpoint}/add-wish-list/${id}/`;
export const wishlistURL =`${endpoint}/wish-list/`;
export const checkWishlistURL =id=>`${endpoint}/check-wish-list/${id}/`;
export const stripePaymentURL=`${endpoint}/payment-stripe/`;
export const checkoutURL = `${endpoint}/checkout/`;
export const downloadURL = id=>`${endpoint}/download/${id}/`;
export const superUserURL=`${endpoint}/super-user/`;
export const isStaffURL = `${endpoint}/is-staff/`;

