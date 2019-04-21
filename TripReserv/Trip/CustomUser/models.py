
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)



class UserManager(BaseUserManager):
    def create_user(self, email,full_name, password=None,is_active=True,is_staff=False,is_admin=False):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        if not password:
            raise ValueError('Users must have a Password')

        if not full_name:
            raise ValueError('users must have a fullname')
        user = self.model(
            email=self.normalize_email(email),
            full_name = full_name
        )
        user.set_password(password)
        
        user.admin = is_admin
        user.staff = is_staff
        user.active = is_active
        user.save(using=self._db)
        return user

    def create_staffuser(self, email,full_name, password):
        """
        Creates and saves a staff user with the given email and full_name and password.
        """
        user = self.create_user(
            email,
            full_name,
            password=password,
            is_staff=True,
        )
        return user

    def create_superuser(self, email, full_name,password):
        """
        """
        user = self.create_user(
        #Creates and saves a superuser with the given email and fullname and password.
            email,
            full_name,
            password=password,
            is_staff=True,
            is_admin=True,
        )
     
        return user





class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    active = models.BooleanField(default=False) # can login
    staff = models.BooleanField(default=False) # a admin user; non super-user
    admin = models.BooleanField(default=False) # a superuser
    full_name = models.CharField(max_length=255,blank=True,null=True)
    title = models.CharField(max_length=50,blank=True,null=True)
    country = models.CharField(max_length=50,blank=True,null=True)
    mobile = models.CharField(max_length=50,blank=True,null=True)
    birthday = models.DateField(blank=True,null=True)
    register_date = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    # notice the absence of a "Password field", that's built in.
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name'] # Email & Password are required by default.
    objects = UserManager()

    def get_full_name(self):
        # The user is identified by their email address
        return self.full_name

    def get_short_name(self):
        # The user is identified by their email address
        return self.full_name

    def __str__(self):              # __unicode__ on Python 2
        return self.full_name

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.staff

    @property
    def is_admin(self):
        "Is the user a admin member?"
        return self.admin

    @property
    def is_active(self):
        "Is the user active?"
        return self.active

