<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MemberStatusUpdated extends Notification
{
    use Queueable;

    public $status;

    /**
     * Create a new notification instance.
     */
    public function __construct($status)
    {
        $this->status = $status;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        if ($this->status === 'approved') {
            return (new MailMessage)
                        ->subject('Membership Approved')
                        ->line('Your membership has been approved.')
                        ->action('Login to your account', url('/login'))
                        ->line('Thank you for joining the Setia Alam Mosque Community!');
        } else {
            return (new MailMessage)
                        ->subject('Membership Application updated')
                        ->line('Assalamualaikum, We regret to inform you that your membership application has been rejected.')
                        ->line('Please contact the administration for more information.');
        }
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
