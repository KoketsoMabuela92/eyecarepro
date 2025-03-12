<?php

namespace App\GraphQL\Queries;

use App\Models\Message;
use Illuminate\Support\Facades\Auth;

class UserMessages
{
    /**
     * Resolve the userMessages query.
     *
     * @param  null  $root
     * @param  array  $args
     * @param  mixed  $context
     * @param  \Nuwave\Lighthouse\Support\Contracts\GraphQLContext  $graphqlContext
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function __invoke($root, array $args, $context, $graphqlContext)
    {
        $userId = $args['userId'] ?? Auth::id();

        return Message::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
