from django.db import models
from django.db.models import fields
from rest_framework import serializers
from core.models import *
from core.views import get_user_contact
from django.contrib.auth import get_user_model
User = get_user_model()
# Variation, ItemVariation,

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value



class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model=Coupon
        fields=(
            'id',
            'code',
            'amount'
        )

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model=Images
        fields=(
            'id',
            'item',
            'image',
        )

class ItemSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    label = serializers.SerializerMethodField()
    # thumbnail = serializers.SerializerMethodField()
    class Meta:
        model =Item
        fields=(
            'id',
            'title',
            'category',
            'label',
            'thumbnail',
            'slug',
            'overview',
            'user_wishlist',
            'avarage_rate',
            'discount_price',
            'count_sell',
            'price',
            
        )
    def get_category(self, obj):
        return obj.get_category_display()
    def get_label(self, obj):
        return obj.get_label_display()
    # def get_thumbnail(self, obj):
    #     thumbnail = ThumbnailItem.objects.filter(item=obj)
    #     return ThumbnailItemSerializer(thumbnail, many=True, read_only=False).data

class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    class Meta:
        model= UserProfile
        fields=('__all__')

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields=(
            'first_name',
            'last_name',
            'email',
            'is_active',
            'id',
            'username'
        )

class UserSerializer(serializers.ModelSerializer):
    groups = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name',
     ) 
    class Meta:
        model =User
        fields=('__all__')
        # hide password hash(not allow read - allow create or update)
        extra_kwargs = {'password': {'write_only': True}}


# class ItemVariationDetailSerializer(serializers.ModelSerializer):
#     variation = serializers.SerializerMethodField()
#     class Meta:
#         model =ItemVariation
#         fields=(
#             'id',
#             'variation',
#             'value'
#         )
#     def get_variation(self, obj):
#         return VariationDetailSerializer(obj.variation).data


class OrderItemSerializer(serializers.ModelSerializer):
    item = serializers.SerializerMethodField()
    # item_variations = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()
    class Meta:
        model =OrderItem
        fields=(
            'id',
            'item',
            # 'quantity',
            # 'item_variations',
            'final_price'
        )
    def get_item(self, obj):
        return ItemSerializer(obj.item).data
    # def get_item_variations(self, obj):
    #     return ItemVariationDetailSerializer(obj.item_variations.all(), many=True).data
    def get_final_price(self,obj):
            return obj.get_final_price()

class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    coupon = serializers.SerializerMethodField()
    user = serializers.StringRelatedField()

    class Meta:
        model =Order
        fields=(
            'id',
            'order_items',
            'total',
            'coupon',
            'ordered',
            'ordered_date',
            'user',
        )
    def get_order_items(self, obj):
        return OrderItemSerializer(obj.items.all(), many =True).data
    def get_total(self,obj):
        return obj.get_total()
    def get_coupon(self,obj):
        if obj.coupon is not None:
            return CouponSerializer(obj.coupon).data
        return None


class File3DSerializer(serializers.ModelSerializer):
    class Meta:
        model =Files3D
        fields=(
            'id',
            'item',
            'file',
        )

class FileDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model =FileDocument
        fields=(
            'id',
            'item',
            'document',
        )

# class ThumbnailItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model =ThumbnailItem
#         fields=(
#             'id',
#             'item',
#             'thumbnail',
#         )




# class VariationSerializer(serializers.ModelSerializer):
#     item_variations = serializers.SerializerMethodField()

#     class Meta:
#         model =Variation
#         fields=(
#             'id',
#             'name',
#             'item_variations'
#         )

#     def get_item_variations(self, obj):
#         return ItemVariationSerializer(obj.itemvariation_set.all(), many=True).data

class ItemDetailSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    label = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    files = serializers.SerializerMethodField()
    document = serializers.SerializerMethodField()

    class Meta:
        model =Item
        fields=('__all__')
    def get_category(self, obj):
        return obj.get_category_display()
    def get_label(self, obj):
        return obj.get_label_display()
    def get_files(self, obj):
        files = Files3D.objects.filter(item=obj)
        return File3DSerializer(files, many=True,read_only=False).data
    def get_document(self, obj):
        document = FileDocument.objects.filter(item=obj)
        return FileDocumentSerializer(document, many=True,read_only=False).data
    def get_images(self, obj):
        images = Images.objects.filter(item=obj)
        return ImageSerializer(images, many=True, read_only=False).data


# class AddressSerializer(serializers.ModelSerializer):
#     country= CountryField()
#     class Meta:
#         model=Address
#         fields=(
#             'id',
#             'user',
#             'street_address',
#             'apartment_address',
#             'country',
#             'zip',
#             'address_type',
#             'default'
#         )

SEARCH_PATTERN = 'src=\\"/media/uploads/'
SITE_DOMAIN = "http://127.0.0.1:8000"
REPLACE_WITH = 'src=\\"%s/media/uploads/' % SITE_DOMAIN

class FixAbsolutePathSerializer(serializers.Field):

    def to_representation(self, value):
        text = value.replace(SEARCH_PATTERN, REPLACE_WITH)
        # print(text)
        return text

class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    class Meta:
        model= Post
        fields=(
            'id',
            'title',
            'overview',
            'thumbnail',
            'author',
            'timestamp',
            'slug',

        )

class PostDetailSerializer(serializers.ModelSerializer):
    # content =FixAbsolutePathSerializer()
    author = serializers.StringRelatedField()
    class Meta:
        model= Post
        fields=("__all__")

class PostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model= Post
        fields=(
            'id',
            'title',
            'content',
            'slug',
            'overview',
        )

class PaymentItemSerializer(serializers.ModelSerializer):
    item = serializers.SerializerMethodField()
    class Meta:
        model =PaymentItem
        fields=("__all__")
    def get_item(self, obj):
        return ItemSerializer(obj.item).data

class PaymentSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    
    class Meta:
        model=Payment
        fields=("__all__")
    def get_items(self, obj):
        return PaymentItemSerializer(obj.items.all(), many =True).data


class CommentSerializer(serializers.ModelSerializer):
    User_ID = serializers.StringRelatedField()
    # publish = serializers.DateTimeField(format="%d-%B-%Y %H:%M:%S")
    class Meta:
        model= Comment
        fields="__all__"
    def create(self,request):
        data= request.data
        userID= request.user
        # print(userID)
        # userId= UserProfile.objects.get(id = data['User_ID'])
        itemId = Item.objects.get(id=data['Item_ID'])
        itemId.count_comment +=1
        itemId.save()
        comment_data= Comment()
        comment_data.User_ID = userID
        comment_data.Item_ID = itemId
        comment_data.content = data['content']
        # comment_data.publish = data['publish']
        comment_data.save()
        return comment_data


class CommentReplySerializer(serializers.ModelSerializer):
    User_ID = serializers.StringRelatedField()
    class Meta:
        model= CommentReply
        fields="__all__"
    def create(self,request):
        data= request.data
        userID= request.user
        commentID = Comment.objects.get(id=data['Comment_ID'])
        comment_data= CommentReply()
        comment_data.User_ID = userID
        comment_data.Comment_ID = commentID
        comment_data.content = data['content']
        comment_data.save()
        return comment_data

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model =Item
        fields=('id','user_wishlist')

class ContactSerializer(serializers.StringRelatedField):
    def to_internal_value(self, data):
        return data

class ChatSerializer(serializers.ModelSerializer):
    participants = ContactSerializer(many=True)
    class Meta:
        model=Chat
        fields=(
            'id',
            'messages',
            'participants'
        )
        read_only = ('id')
    def create(self, validated_data):
        print(validated_data)
        participants = validated_data.pop('participants')
        chat = Chat()
        chat.save()
        for username in participants:
            contact = get_user_contact(username)
            chat.participants.add(contact)
        chat.save()
        return chat

class ContactsSerializer(serializers.ModelSerializer):
    class Meta:
        model =Contact
        fields=('user','friends')

class DayOrderSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField()
    class Meta:
        model =Order
        fields=('id','total')
    def get_total(self,obj):
        return obj.get_total()
