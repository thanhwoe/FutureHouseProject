
export let domain = ""
export let socket_url = ""
if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
    domain = 'http://127.0.0.1:8000'
    socket_url ='ws://127.0.0.1:8000'
} else {
    domain = 'https://gw-future-house.herokuapp.com'
    socket_url ='wss://gw-future-house.herokuapp.com'
}
export const localhost = domain
const apiURL ='/api'
export const endpoint =`${domain}${apiURL}`

export const productListURL=`${endpoint}/products/`;
export const productTopListURL=`${endpoint}/products-top/`;
export const productDetailURL= id=> `${endpoint}/products/${id}/`;
export const addToCartURL=`${endpoint}/add-to-cart/`;
export const orderSummaryURL = `${endpoint}/order-summary/`;
export const checkoutURL = `${endpoint}/checkout/`;
export const userListURL = `${endpoint}/user-list/`;
export const userProfileURL = `${endpoint}/user-profile-list/`;
export const addCoupontURL = `${endpoint}/add-coupon/`;
export const countryListURL = `${endpoint}/countries/`;
export const orderItemDeleteURL =id=> `${endpoint}/order-items/${id}/delete/`;
export const orderItemUpdateURL =`${endpoint}/order-item/update-quantity/`;
export const userIDURL = `${endpoint}/user-id/`;
export const isStaffURL = `${endpoint}/is-staff/`;
export const paymentListURL = `${endpoint}/payments/`;
export const checkoutSectionURL = `${endpoint}/checkout-section/`;
export const downloadURL = id=>`${endpoint}/download/${id}/`;
export const commentURL = id=>`${endpoint}/comment/${id}/`;
export const commentReplyURL = id=>`${endpoint}/comment-reply/${id}/`;
export const postCommentURL = `${endpoint}/post-comment/`;
export const postCommentReplyURL = `${endpoint}/post-comment-reply/`;
export const postBlogURL = `${endpoint}/post-list/`;
export const postDetailBlogURL = id=> `${endpoint}/post/${id}/`;
export const productCreateURL = `${endpoint}/product/create/`;
export const files3DCreateURL =id=> `${endpoint}/file/${id}/create/`;
export const documentCreateURL =id=> `${endpoint}/document/${id}/create/`;
export const imagesCreateURL =id=> `${endpoint}/image/${id}/create/`;
export const productUpdateURL =id=> `${endpoint}/product/${id}/update/`;
export const fileDeleteURL =id=> `${endpoint}/file/${id}/delete/`;
export const documentDeleteURL =id=> `${endpoint}/document/${id}/delete/`;
export const imageDeleteURL =id=> `${endpoint}/images/${id}/delete/`;
export const productDeleteURL =id=> `${endpoint}/product/${id}/delete/`;
export const userDetailURL =id=> `${endpoint}/user/${id}/`;
export const userUpdateURL =id=> `${endpoint}/user/${id}/update/`;
export const userOrderURL =id=> `${endpoint}/order-user/${id}/`;
export const userPaymentURL =id=> `${endpoint}/payment-user/${id}/`;
export const orderListURL =`${endpoint}/order-list/`;
export const couponListURL =`${endpoint}/coupon-list/`;
export const couponCreateURL =`${endpoint}/coupon-create/`;
export const couponDetailURL =id=>`${endpoint}/coupon-detail/${id}/`;
export const couponDeleteURL =id=>`${endpoint}/coupon/${id}/delete/`;
export const couponUpdateURL =id=>`${endpoint}/coupon/${id}/update/`;
export const postDeleteURL =id=>`${endpoint}/post/${id}/delete/`;
export const postCreateURL =`${endpoint}/post-create/`;
export const postUpdateURL =id=>`${endpoint}/post/${id}/update/`;
export const emailSendURL =`${endpoint}/send-email/`;
export const emailConfirmURL =`${endpoint}/send-email/confirm/`;
export const searchURL =searchKey=>`${endpoint}/search/${searchKey}`;
export const analyzePaymentURL =`${endpoint}/analyze-payment/`;
export const analyzeOrderURL =`${endpoint}/analyze-order/`;
export const analyzeUserURL =`${endpoint}/analyze-user/`;
export const addWishlistURL =id=>`${endpoint}/add-wish-list/${id}/`;
export const wishlistURL =`${endpoint}/wish-list/`;
export const checkWishlistURL =id=>`${endpoint}/check-wish-list/${id}/`;
export const rateStarURL=`${endpoint}/rate-star/`;
export const superUserURL=`${endpoint}/super-user/`;
export const stripePaymentURL=`${endpoint}/payment-stripe/`;
export const chatCreateURL=`${endpoint}/chat/create/`;
export const chatListURL=`${endpoint}/chat-list/`;
export const chatDeleteURL=id=>`${endpoint}/chat/${id}/delete/`;
export const salePerDayURL=`${endpoint}/sale-per-day/`;
export const blockUserURL = `${endpoint}/block-user/`;




