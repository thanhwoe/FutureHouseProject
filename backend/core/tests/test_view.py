from .test_setup import TestSetUp
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.urls import reverse
from core.models import *
import json
class TestViews(TestSetUp):

    def test_user_cannot_register_with_no_data(self):
        res = self.client.post("/rest-auth/registration/")
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_register_with_data(self):
        res = self.client.post("/rest-auth/registration/",
                                self.user_data_register)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_user_login(self):
        res = self.client.post("/rest-auth/login/",
                                self.user_data_login)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
    
    def test_user_detail(self):
        self.token = Token.objects.create(user = self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token "+
                                 self.token.key)
        res = self.client.get(reverse("user-detail",
                                kwargs={"pk":self.user.pk}))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_user_update(self):
        self.token = Token.objects.create(user = self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token "+ self.token.key)
        res = self.client.put(reverse("update-user",kwargs={"pk":1}),
        {"first_name":"user","last_name":"test","email":"user@gmail.com"})
        # self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
    
    def test_get_products_list(self):
        res =self.client.get("/api/products/")
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_product(self):
        self.token = Token.objects.create(user = self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token "
                                + self.token.key)
        res =self.client.post("/api/product/create/",
                                self.product_data,
                                format='multipart')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
    
    def test_cannot_create_product_with_no_auth(self):
        res =self.client.post("/api/product/create/",
                                self.product_data, 
                                format='multipart')
        self.assertEqual(res.status_code,status.HTTP_401_UNAUTHORIZED)

    def test_get_product_detail(self):
        res =self.client.get(reverse("product-detaill"
                            ,kwargs={"pk":self.product.pk}))
        self.assertEqual(res.status_code, status.HTTP_200_OK) 
    
    def test_update_product(self):
        self.token = Token.objects.create(user = self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token "
                                + self.token.key)
        res =self.client.put(reverse("update-product",
                        kwargs={"pk":self.product.pk}),
                        data=json.dumps(self.put_data_product),
                        content_type='application/json')
        self.assertEqual(res.status_code, status.HTTP_200_OK) 

    def test_delete_product(self):
        self.token = Token.objects.create(user = self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token "+ 
                                self.token.key)
        res = self.client.delete(reverse("delete-product",
                                kwargs={"pk":self.product.pk}))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

    def test_post_comment(self):
        self.token = Token.objects.create(user = self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token "+
                                self.token.key)
        res =self.client.post("/api/post-comment/",
                                self.comment_data)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_get_blog_list(self):
        res = self.client.get("/api/post-list/")
        self.assertEqual(res.status_code, status.HTTP_200_OK) 
    
    def test_create_blog(self):
        self.token = Token.objects.create(user = self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token "+ 
                                self.token.key)
        res = self.client.post("/api/post-create/", self.blog_data)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_cannot_create_blog_with_no_auth(self):
        res = self.client.post("/api/post-create/", self.blog_data)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_blog_detail(self):
        res = self.client.get(reverse("blog-detail",
                            kwargs={"pk":self.blog.pk}))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_update_blog(self):
        self.token = Token.objects.create(user = self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token "+ 
                                self.token.key)
        res = self.client.put(reverse("blog-update",
                            kwargs={"pk":self.blog.pk}),
                            data=json.dumps(self.put_blog_data),
                            content_type='application/json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_blog(self):
        self.token = Token.objects.create(user = self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token "+ 
                                self.token.key)
        res = self.client.delete(reverse("blog-delete",
                                kwargs={"pk":self.blog.pk}))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

    def test_add_product_to_cart(self):
        self.token = Token.objects.create(user = self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token "+ 
                                self.token.key)
        res = self.client.post("/api/add-to-cart/",
                                {"slug":self.product.slug})
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    # def test_get_order_list(self):
    #     self.token = Token.objects.create(user = self.user)
    #     self.client.credentials(HTTP_AUTHORIZATION="Token "+
    #                              self.token.key)
    #     res= self.client.get("/api/order-list/")
    #     self.assertEqual(res.status_code, status.HTTP_200_OK)
    def test_add_coupon_to_order(self):
        self.token = Token.objects.create(user = self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token "+
                                 self.token.key)
        res= self.client.get("/api/add-coupon/",{"code":"testcode"})
        self.assertEqual(res.status_code, status.HTTP_200_OK)

 