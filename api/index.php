<?php

header('Access-Control-Allow-Origin: *');

require_once __DIR__.'/vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\ParameterBag;

$app = new Silex\Application();

$app['debug'] = true;

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'dbs.options' => array (
        'mysql_read' => array(
          'driver'    => 'pdo_mysql',
          'host'      => 'localhost',
          'dbname'    => 'webcourse',
          'user'      => 'root',
          'password'  => '',
          'charset'   => 'utf8',
        ),
        'mysql_write' => array(
          'driver'    => 'pdo_mysql',
          'host'      => 'localhost',
          'dbname'    => 'webcourse',
          'user'      => 'root',
          'password'  => '',
          'charset'   => 'utf8',
        ),
    ),
));

$app->get('/users/delete/{id}', function($id) use($app) {

  $app['db']->delete('users', array(
      'id' => $id,
  ));

  $users = $app['db']->fetchAll('SELECT * FROM users');
  return $app->json($users, 200);

});

$app->get('/users/get', function() use($app) {

  $users = $app['db']->fetchAll('SELECT * FROM users');
  return $app->json($users, 200);

});

$app->post('/users/add', function(Request $request) use($app) {

  $data = json_decode($request->getContent());

  $app['db']->insert('users', array(
    'firstname' => $data->firstname,
    'lastname' => $data->lastname,
    'phone' => $data->phone,
    'email' => $data->email,
    'paid' => $data->paid,
    'age' => $data->age,
    'experience' => $data->experience,
    'sources' => $data->sources,
    'about' => $data->about
  ));

  $users = $app['db']->fetchAll('SELECT * FROM users');
  return $app->json($users, 200);

});

$app->run();
