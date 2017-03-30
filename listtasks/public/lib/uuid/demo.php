<?php
header("Content-type: text/html; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);

$path = '../../';
set_include_path(get_include_path() . PATH_SEPARATOR . $path);

// Usage
require_once 'lib/uuid/UUID.class.php';
// Named-based UUID.
//$v3uuid = UUID::v3('1546058f-5a25-4334-85ae-e68f2a44bbaf', 'SomeRandomString');
//$v5uuid = UUID::v5('1546058f-5a25-4334-85ae-e68f2a44bbaf', 'SomeRandomString');
// Pseudo-random UUID
echo $v4uuid = UUID::v4();

?>