# Generated by Django 4.2 on 2023-05-23 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_userprofile_profile_pic_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_pic_url',
            field=models.URLField(default='http://jasma-api-server:8000/media/images/avatars/default-profile-pic.webp', max_length=300),
        ),
    ]
