# Generated by Django 5.1.4 on 2024-12-08 21:50

import django.contrib.postgres.fields
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('sessions', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserInformation',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, related_name='info', serialize=False, to=settings.AUTH_USER_MODEL)),
                ('country', models.TextField(blank=True, null=True)),
                ('sessions', models.IntegerField(blank=True, null=True)),
                ('enabled_countries', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=255), blank=True, null=True, size=None)),
                ('phone', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'user_information',
            },
        ),
        migrations.CreateModel(
            name='UserPrivileges',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, related_name='privs', serialize=False, to=settings.AUTH_USER_MODEL)),
                ('privs', models.IntegerField()),
            ],
            options={
                'db_table': 'user_privileges',
            },
        ),
        migrations.CreateModel(
            name='InvalidSessions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('session', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, to='sessions.session')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'invalid_sessions',
            },
        ),
    ]