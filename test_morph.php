<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

try {
    $claim = App\Models\Claim::first();
    echo "Claim ID: " . $claim->id . "\n";
    echo "Deceased type: " . $claim->deceased_person_type . "\n";
    echo "Deceased ID: " . $claim->deceased_person_id . "\n";
    
    $deceased = $claim->deceased;
    echo "Deceased name: " . $deceased->name . "\n";
    echo "Success! MorphTo relationship working.\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n";
}
