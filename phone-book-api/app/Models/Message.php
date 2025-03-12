<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use GraphQL\Error\Error;

class Message extends Model
{
    use HasFactory;

    const TYPE_EMAIL = 'EMAIL';
    const TYPE_TEXT = 'TEXT';

    const STATUS_QUEUED = 'QUEUED';
    const STATUS_SENT = 'SENT';
    const STATUS_FAILED = 'FAILED';
    const STATUS_DELIVERED = 'DELIVERED';
    const STATUS_READ = 'READ';

    protected $fillable = ['type', 'body', 'status', 'user_id', 'contact_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function setUserIdAttribute($value)
    {
        $this->attributes['user_id'] = auth()->id() ?? $value;
    }

    /**
     * Create a new message and persist it to the database.
     *
     * @param array $data
     * @return Message
     * @throws Error
     */
    public static function createMessage(array $data): Message
    {
        if (empty($data['user_id'])) {
            throw new Error('User ID is required');
        }

        // Set default status
        $data['status'] = self::STATUS_QUEUED;

        try {
            $message = self::create($data);
            Log::info("Message Created: ", ['message' => $message]);

            return $message;
        } catch (\Exception $e) {
            Log::error("Message creation failed: ", ['error' => $e->getMessage()]);
            throw new Error('Failed to create message');
        }
    }
}
