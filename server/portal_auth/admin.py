from django.contrib import admin
from .models import User
from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField


from django.contrib.auth.admin import UserAdmin 
class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    password = forms.CharField(label='Password', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = '__all__'

    def clean_password2(self):
        # Check that the two password entries match
        password = self.cleaned_data.get("password")
        return password

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    disabled password hash display field.
    """
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = '__all__'


class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('email','first_name', 'last_name', 'initiation_number', 'is_staff')
    list_filter = ('is_staff', 'initiation_number')
    fieldsets = (
        ("Authentication", {'fields': ('email', 'username', 'password', 'is_active')}),
        ("Personal Information", {'fields': ("first_name", 'last_name', 'initiation_number')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (None, {'fields': ('last_login',)})
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        ("Authentication", {'fields': ('email', 'username', 'password', 'is_active')}),
        ("Personal Information", {'fields': ("first_name", 'last_name', 'initiation_number')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (None, {'fields': ('last_login',)})
    )
    search_fields = ('email', 'initiation_number')
    ordering = ('initiation_number',)
    filter_horizontal = ()


# Now register the new UserAdmin...

admin.site.register(User, UserAdmin)
