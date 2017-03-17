<?php

header('Access-Control-Allow-Origin: *');

require_once __DIR__.'/vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\ParameterBag;

$app = new Silex\Application();

$app['debug'] = true;

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

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

$app->get('/{type}/delete/{id}', function($type, $id) use($app) {
  $app['db']->delete($type, array('id' => $id,));
  $users = $app['db']->fetchAll('SELECT * FROM ' . $type);
  return $app->json($users, 200);
});

$app->get('/{type}/get', function($type) use($app) {
  $users = $app['db']->fetchAll('SELECT * FROM ' . $type);
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
    'sources' => $data->sources,
    'visiting' => $data->visiting,
    'month' => $data->month,
    'about' => $data->about
  ));

  $users = $app['db']->fetchAll('SELECT * FROM users');
  return $app->json($users, 200);

});

$app->post('/users/edit', function(Request $request) use($app) {

  $data = json_decode($request->getContent());

  $app['db']->update('users', array(
    'firstname' => $data->firstname,
    'lastname' => $data->lastname,
    'phone' => $data->phone,
    'email' => $data->email,
    'paid' => $data->paid,
    'age' => $data->age,
    'sources' => $data->sources,
    'visiting' => $data->visiting,
    'month' => $data->month,
    'about' => $data->about
  ), array('id' => $data->id));

  $users = $app['db']->fetchAll('SELECT * FROM users');
  return $app->json($users, 200);

});

$app->post('/tasks/add', function(Request $request) use($app) {

  $data = json_decode($request->getContent());

  $app['db']->insert('tasks', array(
    'text' => $data->text,
    'complete' => false,
  ));

  $tasks = $app['db']->fetchAll('SELECT * FROM tasks');
  return $app->json($tasks, 200);

});

$app->run();
