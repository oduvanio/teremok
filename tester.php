<?php
use infrajs\load\Load;
use infrajs\router\Router;
use infrajs\ans\Ans;

if (!is_file('vendor/autoload.php')) {
	chdir('../../../');
	require_once('vendor/autoload.php');	
	Router::init();
}

$ans = array();

$data = Load::loadJSON('-teremok/teremok.php?src=-teremok/images/');

if (!$data || !$data['result']) return Ans::err($ans,'Ошибка нет данных');

return Ans::ret($ans,'Данные есть, теремок должен работать');