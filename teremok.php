<?php
use infrajs\ans\Ans;
use infrajs\path\Path;
use infrajs\router\Router;
use infrajs\load\Load;
use infrajs\config\Config;
use infrajs\access\Access;

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

$list = Access::cache(__FILE__, function($src){
	$list = array();
	array_map(function ($file) use (&$list, $src) {
		if ($file{0}=='.') return;
		$fdata = Load::nameInfo($file);
		if (!in_array($fdata['ext'], array('jpg','jpeg','png'))) return;
		$list[] = $src.Path::toutf($file);
	}, scandir($src));
	return $list;
}, array($src));



$conf = Config::get('teremok');
$count = $conf['count'];


$count = Ans::GET('count','int', $count);

$list = array_slice($list, 0, $count);


$ans['list'] = $list;
return Ans::ret($ans);