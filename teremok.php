<?php
use infrajs\ans\Ans;
use infrajs\path\Path;
use infrajs\router\Router;
use infrajs\load\Load;
use infrajs\config\Config;

if (!is_file('vendor/autoload.php')) {
	chdir('../../../');
	require_once('vendor/autoload.php');
	
	Router::init();
}


$ans = array();

$osrc = Ans::GET('src');

if (!$osrc) return Ans::err($ans,'Для работы необходимо передать параметр ?src= до папки с иллюстрациями: '.$osrc);

$src = Path::theme($osrc);

if (!$src) return Ans::err($ans,'Неправильный путь до папки с иллюстрациями: '.$osrc);


$list = array();
array_map(function ($file) use (&$list, $src) {
	if ($file{0}=='.') return;

	$fdata = Load::nameInfo($file);
	if (!in_array($fdata['ext'], array('jpg','jpeg','png'))) return;
	

	$list[] = $src.Path::toutf($file);
}, scandir($src));



$ans['list'] = $list;

return Ans::ret($ans);