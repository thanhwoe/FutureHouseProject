from django.http.response import HttpResponseRedirect
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from django.core.cache.backends.base import DEFAULT_TIMEOUT, CacheKeyWarning
from django.contrib.auth.models import User
from django.utils.translation import check_for_language
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404, JsonResponse, HttpResponse, HttpResponseRedirect
from django.conf import settings
from django.shortcuts import render, get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.serializers import Serializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from django.utils import timezone
from .serializers import *
from core.models import *
from django.db.models import Q
import zipfile
from shutil import make_archive
from wsgiref.util import FileWrapper
from django.conf import settings
from rest_framework.parsers import MultiPartParser, FormParser
from .utils import Util
from email.mime.text import MIMEText
from django.db.models import Count
from django.db.models.functions import TruncMonth
from core.views import get_user_contact
import stripe
import boto3
from django.utils.timezone import datetime 
today = datetime.today()
# from django.utils.html import escape
from django.contrib.auth import get_user_model
User = get_user_model()

CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

stripe.api_key = 'sk_test_51IojgUHr5QaNTnevsvpuxSr3bfqkgkRLhpZNZPY98PU4mvQ0p6caPWvzHZ1Dn5Pe4hsJ3uKEapHrydCNohrhOWQp00pNlX1Smm'




class UserIDView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({'userID': request.user.id, 'userName': request.user.username}, status=HTTP_200_OK)


class CheckStaffView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        userprofile = self.request.user.userprofile
        return Response({'isStaff': userprofile.isStaff}, status=HTTP_200_OK)

class CheckAdminView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        return Response({'isAdmin': request.user.is_superuser}, status=HTTP_200_OK)

class CheckWishlistView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = WishlistSerializer
    queryset = Item.objects.all()

# @method_decorator(cache_page(CACHE_TTL), name='dispatch')
class UserListView(ListAPIView):
    # permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    queryset = User.objects.all()



class UserProfileListView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        item = UserProfile.objects.all().order_by('-id')
        serializer = UserProfileSerializer(item, many=True)
        return Response(serializer.data)

    def put (self, request):
        uId = request.data.get('id')
        user = get_object_or_404(UserProfile, id = uId )
        user.isStaff = not user.isStaff
        user.save()
        return Response(status=HTTP_200_OK)


class BlockUserListView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        item = User.objects.all().order_by('-id')
        serializer = UserUpdateSerializer(item, many=True)
        return Response(serializer.data)

    def put (self, request):
        uId = request.data.get('id')
        user = get_object_or_404(User, id = uId )
        user.is_active = not user.is_active
        user.save()
        return Response(status=HTTP_200_OK)


# @method_decorator(cache_page(CACHE_TTL), name='dispatch')
class UserDetailView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    queryset = User.objects.all()


class PaymentByIDView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, userID, format=None):
        payment = Payment.objects.filter(user=userID)
        serializer = PaymentSerializer(payment, many=True)
        return Response(serializer.data)

# class OrderByIDView(RetrieveAPIView):
#     permission_classes =(AllowAny,)
#     serializer_class =OrderSerializer
#     def get_object(self,userID):
#         print(userID)
#         try:
#             order = Order.objects.get(user_id=userID)

#             return order

#         except ObjectDoesNotExist:
#             raise Http404("You do not have an active order")

class SalePerDayView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = DayOrderSerializer
    queryset = Order.objects.all().filter(ordered_date__year=today.year, ordered_date__month=today.month, ordered_date__day=today.day)

class OrderByIDView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, userID, format=None):
        order = Order.objects.filter(user=userID)
        serializer = OrderSerializer(order, many=True)
        return Response(serializer.data)


class UserUpdateView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserUpdateSerializer
    queryset = User.objects.all()


# @method_decorator(cache_page(CACHE_TTL), name='dispatch')
class ItemListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemSerializer
    queryset = Item.objects.all().order_by('-id')


# @method_decorator(cache_page(CACHE_TTL), name='dispatch')
class ItemTopListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemSerializer
    queryset = Item.objects.all().order_by('-count_sell')

def infinite_filter_item(request):
    limit = request.GET.get('limit')
    offset = request.GET.get('offset')
    return Item.objects.all()[int(offset):int(offset)+int(limit)]


def hasMore_item(request):
    offset = request.GET.get('offset')
    if(int(offset) >= Item.objects.all().count()):
        return False
    return True



class ItemListInfiniteView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemSerializer

    def get_queryset(self):
        qs = infinite_filter_item(self.request)
        return qs

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "data": serializer.data,
            "has_more": hasMore_item(request)
        })



class OrderListView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = OrderSerializer
    queryset = Order.objects.all()


class CouponListView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CouponSerializer
    queryset = Coupon.objects.all()


class CouponDetailView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CouponSerializer
    queryset = Coupon.objects.all()


class CouponUpdateView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CouponSerializer
    queryset = Coupon.objects.all()


class CouponDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Coupon.objects.all()


class CouponCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CouponSerializer
    queryset = Coupon.objects.all()


class PostCreateView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        title = request.data.get('title')
        overview = request.data.get('overview')
        content = request.data.get('content')
        author = request.user
        slug = request.data.get('slug')
        thumbnail = request.data.get('thumbnail')
        try:

            item = Post()
            item.title = title
            item.overview = overview
            item.content = content
            item.author = author
            item.slug = slug
            item.thumbnail = thumbnail
            item.save()
            # return Response(status=HTTP_200_OK)
            return Response(status=HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({"message": "A serious error occurred. We have been notifed."}, status=HTTP_400_BAD_REQUEST)


class PostUpdateView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PostUpdateSerializer
    queryset = Post.objects.all()


class PostDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Post.objects.all()


class ImageCreateView(APIView):
    permission_classes = (AllowAny,)
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request,Item_ID, format=None):
        images = request.FILES.getlist("null")
        try:
            item_qs = get_object_or_404(Item, id=Item_ID)
            for im in images:

                image = Images()
                image.item = item_qs
                image.image = im
                image.save()
            return Response(status=HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"message": "A serious error occurred. We have been notifed."}, status=HTTP_400_BAD_REQUEST)


class FileCreateView(APIView):
    permission_classes = (AllowAny,)
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request,Item_ID, format=None):
        files = request.FILES.getlist("null")
        print(files)
        try:
            item_qs = get_object_or_404(Item, id=Item_ID)
            for f in files:
                print(f)
                file = Files3D()
                file.item = item_qs
                file.file = f
                file.save()
            return Response(status=HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"message": "A serious error occurred. We have been notifed."}, status=HTTP_400_BAD_REQUEST)

class DocumentCreateView(APIView):
    permission_classes = (AllowAny,)
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request,Item_ID, format=None):
        document = request.FILES.getlist("null")
        try:
            item_qs = get_object_or_404(Item, id=Item_ID)
            for f in document:
                # print(f)
                file = FileDocument()
                file.item = item_qs
                file.document = f
                file.save()
            return Response(status=HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"message": "A serious error occurred. We have been notifed."}, status=HTTP_400_BAD_REQUEST)


class CreateItemView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        files = request.FILES.getlist("files")
        images = request.FILES.getlist("images")
        document = request.FILES.getlist("document")
        title = request.data.get('title')
        price = request.data.get('price')
        discount_price = request.data.get('discount_price')
        category = request.data.get('category')
        label = request.data.get('label')
        slug = request.data.get('slug')
        description = request.data.get('description')
        square_foot = request.data.get('square_foot')
        beds = request.data.get('beds')
        stories = request.data.get('stories')
        garages = request.data.get('garages')
        baths = request.data.get('baths')
        thumbnail = request.data.get('thumbnail')
        try:

            item = Item()
            item.title = title
            item.price = price
            item.discount_price = discount_price
            item.category = category
            item.label = label
            item.slug = slug
            item.description = description
            item.square_foot = square_foot
            item.beds = beds
            item.stories = stories
            item.thumbnail = thumbnail
            item.garages = garages
            item.baths = baths
            item.save()

            item_qs = get_object_or_404(Item, slug=slug)

            for f in files:
                file = Files3D()
                file.item = item_qs
                file.file = f
                file.save()

            for im in images:
                image = Images()
                image.item = item_qs
                image.image = im
                image.save()
                
            for doc in document:
                docu = FileDocument()
                docu.item = item_qs
                docu.document = doc
                docu.save()

            return Response(status=HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({"message": "A serious error occurred. We have been notifed."}, status=HTTP_400_BAD_REQUEST)
        # print(request.data)
        # print(files)
        # serializer = ItemDetailSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=HTTP_200_OK)
        # else:
        #     return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class ItemUpdateView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    # parser_classes = [MultiPartParser,FormParser]
    serializer_class = ItemSerializer
    queryset = Item.objects.all()


class ItemDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Item.objects.all()


class FileDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Files3D.objects.all()

class DocumentDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = FileDocument.objects.all()

class ImagesDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Images.objects.all()

# class ThumbnailDeleteView(DestroyAPIView):
#     permission_classes=(IsAuthenticated,)
#     queryset = ThumbnailItem.objects.all()


class OrderItemDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = OrderItem.objects.all()


# @method_decorator(cache_page(CACHE_TTL), name='dispatch')
class ItemDetailView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemDetailSerializer
    queryset = Item.objects.all()

    def create(self, request, *args, **kwargs):
        instance_data = request.data
        data = {key: value for key, value in instance_data.items()}
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        if request.FILES:
            images = dict((request.FILES).lists()).get('images', None)
            if images:
                for image in images:
                    image_data = {}
                    image_data["item"] = instance.pk
                    image_data["image"] = image
                    image_serializer = ImageSerializer(data=image_data)
                    image_serializer.is_valid(raise_exception=True)
                    image_serializer.save()

        return Response(serializer.data)


class ProductFilter(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemDetailSerializer
    # queryset= Item.objects.all()
    model = serializer_class.Meta.model

    def get_queryset(self):
        query = self.kwargs.get('q')
        if query:
            
            # code for analyse
            # querysets=  self.model.objects.filter(
            #     Q(slug__icontains=query) |
            #     Q(title__icontains=query)
            # ).distinct()
            # print(querysets.explain(analyse = True))

            # code for run app
            return self.model.objects.filter(
                Q(slug__icontains=query) |
                Q(title__icontains=query)|
                Q(label__icontains=query)|
                Q(category__icontains=query)|
                Q(discount_price__icontains=query)
            ).distinct()
        return None


class DownloadView(ListAPIView):
    def get(self, request, *args, **kwargs):
        queryset = Item.objects.get(id=kwargs['pk'])
        client = boto3.client('s3', aws_access_key_id = settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key = settings.AWS_SECRET_ACCESS_KEY)
        bucket_name = settings.AWS_STORAGE_BUCKET_NAME
        file_name = f'{queryset.slug}/document.zip'
        file_path = client.generate_presigned_url(
                                        'get_object', 
                                        Params = { 
                                                    'Bucket': bucket_name, 
                                                    'Key': file_name, }, 
                                        ExpiresIn = 3*24*3600, )        
        return HttpResponse(file_path)
        # return HttpResponse(queryset)


class AddToCartView(APIView):
    def post(self, request, *args, **kwargs):
        slug = request.data.get('slug', None)
        if slug is None:
            return Response({"message": "Invalid request"}, status = HTTP_400_BAD_REQUEST)
        item = get_object_or_404(Item, slug=slug)

        order_item_qs = OrderItem.objects.filter(
            item=item,
            user=request.user,
            ordered=False
        )

        if order_item_qs.exists():
            return Response({'message': 'This item already in your cart'}, status = HTTP_200_OK)

        else:
            order_item = OrderItem.objects.create(
                item=item,
                user=request.user,
                ordered=False
            )
            order_item.save()

        order_qs = Order.objects.filter(user=request.user, ordered=False)
        # print(order_item)
        if order_qs.exists():
            order = order_qs[0]
            # check if the order item is in the order
            if not order.items.filter(item__id=order_item.id).exists():
                order.items.add(order_item)
                # messages.info(request, "This item was added to your cart.")
                # return redirect("core:order-summary")
                return Response(status=HTTP_200_OK)
        else:
            ordered_date = timezone.now()
            order = Order.objects.create(
                user=request.user, ordered_date=ordered_date)
            order.items.add(order_item)
            # messages.info(request, "This item was added to your cart.")
            # return redirect("core:order-summary")
            return Response(status=HTTP_200_OK)



class OrderDetailView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = OrderSerializer

    def get_object(self):
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)

            return order
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            # return Response({"message":"You do not have an active order"}, status= HTTP_400_BAD_REQUEST)


# @method_decorator(cache_page(CACHE_TTL), name='dispatch')
class PostListView(ListAPIView):
    # permission_classes= (IsAuthenticated,)
    permission_classes = (AllowAny,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()


# @method_decorator(cache_page(CACHE_TTL), name='dispatch')
class PostDetailView(RetrieveAPIView):
    # permission_classes= (IsAuthenticated,)
    permission_classes = (AllowAny,)
    serializer_class = PostDetailSerializer
    queryset = Post.objects.all()   


class PaymentView(APIView):
    def post(self, request, *args, **kwargs):
        order = Order.objects.get(user=self.request.user, ordered=False)
        listID = request.data.get('itemIDsold')
        url = request.data.get('listURL')
        itemArr = []
        try:
            for (idItem , u) in zip(listID, url):
                item = get_object_or_404(Item, id=idItem)
                item.count_sell +=1
                item.save()
                payment_item = PaymentItem.objects.create(
                    user= request.user,
                    item=item,
                    downloadUrl= u
                )
                payment_item.save()
            payItem_qs = PaymentItem.objects.filter(user= request.user, isPaid = False)
            # create the payment
            payment = Payment()
            payment.user = self.request.user
            payment.amount = order.get_total()
            # payment.itemIDsold = listID
            # payment.listURL = url
            payment.save()

            for ite in payItem_qs:

                payment.items.add(ite)
            payItem_qs.update(isPaid=True)
            # assign the payment to the order
            # 1. update model OrderItem
            order_items = order.items.all()
            order_items.update(ordered=True)
            for item in order_items:
                itemArr.append(item.item.title)
                item.save()
            # 2. update model Order
            order.ordered = True
            order.payment = payment
            order.save()

            # send mail confirm
            user = self.request.user

            # email_body = f'''
            #                 Order of {user.username} has been successfully paid
            #                 Product : {itemArr}
            #                 Total money :   ${payment.amount}
            #                 '''
            # email_subject = 'Payment success'
            # to_email = user.email
            # # converted = MIMEText(email_body, 'html')

            # data = {'email_body':email_body,'to_email':to_email,'email_subject':email_subject}
            # Util.send_mail(data)
            return Response(status=HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"message": "A serious error occurred. We have been notifed."}, status=HTTP_400_BAD_REQUEST)


class AddCouponView(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get('code',None)
        if code is None:
            return Response({"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST)

        order = Order.objects.get(
            user=self.request.user, ordered=False)
        coupon = get_object_or_404(Coupon, code=code)
        order.coupon = coupon
        order.save()
        return Response(status=HTTP_200_OK)


# @method_decorator(cache_page(CACHE_TTL), name='dispatch')
class PaymentListView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PaymentSerializer

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)


class CommentView(ListAPIView):
    queryset = Comment.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CommentSerializer


class CommentReplyView(ListAPIView):
    queryset = Comment.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CommentReplySerializer


class GetComment(APIView):
    def get(self, request, Item_ID, format=None):
        comment = Comment.objects.filter(Item_ID= Item_ID)
        serializer = CommentSerializer(comment, many= True)
        return Response(serializer.data)


class ReceiveComment(CreateAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def post(self, request):
        data = CommentSerializer(data=request.data)
        data.is_valid()
        data_comment = data.create(request)
        if data_comment:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)


class GetCommentReply(APIView):
    def get(self, request, Comment_ID, format=None):
        comment = CommentReply.objects.filter(Comment_ID= Comment_ID)
        serializer = CommentReplySerializer(comment, many= True)
        return Response(serializer.data)


class ReceiveCommentReply(CreateAPIView):
    serializer_class = CommentReplySerializer
    queryset = CommentReply.objects.all()

    def post(self, request):
        data = CommentReplySerializer(data=request.data)
        data.is_valid()
        data_comment = data.create(request)
        if data_comment:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)


class SendEmailView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        email_body = request.data.get('content')
        email_subject = request.data.get('subject')
        to_email = request.data.get('email')
        # converted = MIMEText(email_body, 'html')
        data = {'email_body':email_body,'to_email':to_email,'email_subject':email_subject}
        Util.send_mail(data)
        return Response(status=HTTP_200_OK)


class SendEmailConfirm(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):

        Userid = request.data.get('Userid')
        user = User.objects.get(id=Userid)

        email_body = 'Personal information of ' + user.username + ' has been successfully updated into the system'
        email_subject = 'Email Confirm'
        to_email = user.email
        # converted = MIMEText(email_body, 'html')

        data = {'email_body':email_body,'to_email':to_email,'email_subject':email_subject}
        Util.send_mail(data)
        return Response(status=HTTP_200_OK)


def infinite_filter_order(request):
    limit = request.GET.get('limit')
    offset = request.GET.get('offset')
    return Order.objects.all()[int(offset):int(offset)+int(limit)]


def hasMore_order(request):
    offset = request.GET.get('offset')
    if(int(offset) >=Order.objects.all().count()):
        return False
    return True


# @method_decorator(cache_page(CACHE_TTL), name='dispatch')
class OrderListInfiniteView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = OrderSerializer

    def get_queryset(self):
        qs = infinite_filter_order(self.request)
        return qs
    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "data": serializer.data,
            "has_more": hasMore_order(request)
        })

class AnalyzePayment(APIView):
    def get (self, request,):
        data1 = Payment.objects.filter(timestamp__year=today.year).values('timestamp__year', 'timestamp__month').annotate(count=Count('pk'))
        return Response(data1)

class AnalyzeOrder(APIView):
    def get (self, request,):
        data1 = Order.objects.filter(start_date__year=today.year).values('start_date__year', 'start_date__month').annotate(count=Count('pk'))
        return Response(data1)

class AnalyzeUser(APIView):
    def get (self, request,):
        data1 = User.objects.filter(date_joined__year=today.year).values('date_joined__year', 'date_joined__month').annotate(count=Count('pk'))
        return Response(data1)

class AddToWishlist(APIView):
    permission_classes = (IsAuthenticated,)
    def post (self, request, id):
        item = get_object_or_404(Item, id =id)
        if item.user_wishlist.filter(id= request.user.id).exists():
            item.user_wishlist.remove(request.user)
        else:
            item.user_wishlist.add(request.user)
        return Response(status=HTTP_200_OK)

class Wishlist(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ItemSerializer
    def get_queryset(self):
        return Item.objects.filter(user_wishlist=self.request.user)

class RateStar(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        itemID = request.data.get('itemID')
        star = request.data.get('star')
        item = Item.objects.get(id=itemID)
        oldRate = item.avarage_rate
        if oldRate == 0:
            item.avarage_rate= star
        else:
            newRate = (star + oldRate)/2
            item.avarage_rate =round(newRate, 1)
        item.save()
        return Response(status=HTTP_200_OK)

def infinite_filter_blog(request):
    limit = request.GET.get('limit')
    offset = request.GET.get('offset')
    return Post.objects.all()[int(offset):int(offset)+int(limit)]   

def hasMore_blog(request):
    offset = request.GET.get('offset')
    if(int(offset) >= Post.objects.all().count()):
        return False
    return True   

class BlogListInfiniteView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = PostSerializer

    def get_queryset(self):
        qs = infinite_filter_blog(self.request)
        return qs

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            "data": serializer.data,
            "has_more": hasMore_blog(request)
        })


class StripePayment(APIView):
    # permission_classes = (IsAuthenticated,)
    def post(self, request):
        order = Order.objects.get(user=self.request.user, ordered=False)
        payment_intent = stripe.PaymentIntent.create(
            amount = round(order.get_total())*100,
            payment_method_types=['card'],
            currency='usd'
        )
        
        return Response(status=HTTP_200_OK, data=payment_intent.client_secret)


class ChatListView(ListAPIView):
    serializer_class =ChatSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        queryset = Chat.objects.all()
        username = self.request.query_params.get('username',None)
        if username is not None:
            contact = get_user_contact(username)
            queryset = contact.chats.all()
        return queryset
        
class ChatDetailView(RetrieveAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticated,)

class ChatCreateView(CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticated,)

class ChatUpdateView(UpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticated,)

class ChatDeleteView(DestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticated,)

class ContactUser(APIView):
    serializer_class = ContactsSerializer
    def get(self,request, username):
        user = get_object_or_404(User, username=username)
        contacts = Contact.objects.filter(user=user)

        # return Response(contacts, status=HTTP_200_OK)

        serializer = ContactsSerializer(contacts, many=True)
        return Response(serializer.data)

# class ImageCKEditorUploadView(APIView):
#     permission_classes = [IsAuthenticated]
#     def post(self, request, **kwargs):
#         """
#         Uploads a file and send back its URL to CKEditor.
#         """
#         uploaded_file = request.FILES['upload']

#         backend = image_processing.get_backend()

#         ck_func_num = request.GET.get('CKEditorFuncNum')
#         if ck_func_num:
#             ck_func_num = escape(ck_func_num)

#         if not getattr(settings, 'CKEDITOR_ALLOW_NONIMAGE_FILES', True):
#             try:
#                 backend.image_verify(uploaded_file)
#             except utils.NotAnImageException:
#                 return HttpResponse("""
#                     <script type='text/javascript'>
#                     window.parent.CKEDITOR.tools.callFunction({0}, '', 'Invalid file type.');
#                     </script>""".format(ck_func_num))

#         saved_path = self._save_file(request, uploaded_file)
#         if len(str(saved_path).split('.')) > 1:
#             if(str(saved_path).split('.')[1].lower() != 'gif'):
#                 self._create_thumbnail_if_needed(backend, saved_path)
#         url = utils.get_media_url(saved_path)

#         if ck_func_num:
#             return HttpResponse("""
#             <script type='text/javascript'>
#                 window.parent.CKEDITOR.tools.callFunction({0}, '{1}');
#             </script>""".format(ck_func_num, url))
#         else:
#             retdata = {'url ': url, 'uploaded': '1 ',
#                        'fileName': uploaded_file.name}
#             return JsonResponse(retdata)

