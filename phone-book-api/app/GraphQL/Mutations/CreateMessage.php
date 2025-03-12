<?php

namespace App\GraphQL\Mutations;

use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use GraphQL\Error\Error;

class CreateMessage
{
    public function __invoke($rootValue, array $args)
    {
        if (!isset($args['user_id'])) {
            throw new Error('User ID is required');
        }

        $message = Message::createMessage([
            'contact_id' => $args['contact_id'],
            'type' => $args['type'],
            'body' => $args['body'],
            'user_id' => $args['user_id'],
            'status' => 'QUEUED',
        ]);

        Log::info("Message Created: ", ['message' => $message]);

        return $message;
    }
}
