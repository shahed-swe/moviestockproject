# Generated by Django 3.2.3 on 2021-08-13 12:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20210604_1801'),
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('rated', models.CharField(max_length=50)),
                ('released', models.DateField(null=True)),
                ('runtime', models.CharField(max_length=50)),
                ('genre', models.CharField(max_length=200)),
                ('director', models.CharField(max_length=100)),
                ('writer', models.TextField()),
                ('actors', models.TextField()),
                ('plot', models.TextField()),
                ('language', models.CharField(max_length=100)),
                ('country', models.CharField(max_length=50)),
                ('awards', models.TextField()),
                ('poster', models.URLField()),
                ('metascore', models.IntegerField()),
                ('imdbrating', models.DecimalField(decimal_places=1, max_digits=2)),
                ('imdbvotes', models.IntegerField()),
                ('imdbid', models.CharField(max_length=50)),
                ('type', models.CharField(max_length=50)),
                ('dvd', models.DateField(null=True)),
                ('boxoffice', models.IntegerField()),
                ('production', models.CharField(max_length=100)),
                ('website', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='MovieComments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.movie')),
            ],
        ),
        migrations.RemoveField(
            model_name='state',
            name='country',
        ),
        migrations.DeleteModel(
            name='Address',
        ),
        migrations.DeleteModel(
            name='Country',
        ),
        migrations.DeleteModel(
            name='State',
        ),
    ]
