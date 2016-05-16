#Анимированное слайд-шоу

## Установка через composer.json

```json
{
	"require":{
		"oduvanio/teremok":"~1"
	}
}

```

## Использование
Добавить в head
```html
	<script src="teremok.js"></script>
	<link rel="stylesheet" href="teremok.css" />
```
В любом месте html страницы добавить блок с классом **teremok** в котором будет анимация. Обязательный атрибут **data-src** до папки с картинками относительно корня проекта.
```html
<div class="teremok" data-src="vendor/oduvanio/teremok/images/" style="height:400px"></div>
```

Запустите скрипт, добавив в конце страницы:
```html
	<script>
		Teremok.init();
	</script>
```
## Требования
- composer
- php >= 5.4
- jquery

## Описание работы
- Достаточно указать путь до папки
- С серверным кэшем, по умолчанию в корневой папке проекта /cache, создаётся автоматически
- Автоматическое изменение размера иллюстраций [infrjs/imager](http://github.com/infrajs/imager)

## Использование с infrajs

### Поддерживается конфигурация .infra.json
 - count:5 - ограничение на количество картинок в ротации

### Поддерживается загрузка javascript в одном файле 
С помощью [infrjs/collect](http://github.com/infrajs/collect)