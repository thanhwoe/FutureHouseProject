from core.models import *
from .test_setup import TestSetUp
from django.contrib.auth import get_user_model
User = get_user_model()
class TestModels(TestSetUp):

    def test_model_user(self):
        user = User.objects.create_user(
            username='usertest1',
            password='strong_password'
        )
        self.assertEqual(user.username, 'usertest1')


    def test_model_product(self):
        product = Item.objects.create(
            title = 'testt product',
            price = 20,
            category='Bungalow',
            label='New',
            slug='testt-productt',
            square_foot='2',
            beds='2',
            stories='2',
            garages='2',
            baths='2'
        )
        self.assertEqual(product.title, 'testt product')

    def test_model_blog(self):
        blog = Post.objects.create(
            title='test Blog',
            content='test',
            author=self.user,
            slug='test-bblogg'
        )
        self.assertEqual(blog.title, 'test Blog')

    def test_model_coupon(self):
        coupon = Coupon.objects.create(
            code="test",
            amount=20
        )
        self.assertEqual(coupon.code, 'test')

    def test_model_comment(self):
        comment = Comment.objects.create(
            User_ID=self.user,
            Item_ID= self.product,
            content="test contente"
        )
        self.assertEqual(comment.content, 'test contente')
        

