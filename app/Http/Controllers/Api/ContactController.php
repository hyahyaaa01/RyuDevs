<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Mail\ContactFormSubmitted;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(StoreContactRequest $request): JsonResponse
    {
        $contact = Contact::create($request->validated());

        // Kirim email konfirmasi ke pengirim
        Mail::to($contact->email)
            ->send(new ContactFormSubmitted($contact));

        // Panggil fungsi untuk mengirim Push Notification via FCM ke HP Admin
        $this->sendFirebaseNotification(
            'Pesan Baru dari ' . $contact->name,
            $contact->subject ?? $contact->message
        );

        return response()->json([
            'success' => true,
            'message' => 'Pesan berhasil dikirim.',
            'data'    => $contact,
        ], 201);
    }

    public function index()
    {
        $contacts = Contact::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $contacts
        ]);
    }

    public function destroy($id)
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json([
                'success' => false,
                'message' => 'Pesan tidak ditemukan'
            ], 404);
        }

        $contact->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pesan berhasil dihapus'
        ]);
    }

    /**
     * Fungsi Helper untuk Mengirim Push Notification via FCM
     */
    private function sendFirebaseNotification($title, $body)
    {
        // Masukkan Server Key atau FCM Key dari Firebase Console Anda
        $serverKey = 'MASUKKAN_SERVER_KEY_FIREBASE_ANDA_DISINI'; 
        
        $url = 'https://fcm.googleapis.com/fcm/send';

        $data = [
            "to" => "/topics/admin_ryudevs", // Menggunakan Topic agar ter-broadcast ke semua perangkat admin
            "notification" => [
                "title" => $title,
                "body" => $body,
                "sound" => "default", // Memastikan HP berdering
                "android_channel_id" => "ryudevs_channel_id" // Menyesuaikan channel di Flutter
            ]
        ];

        $encodedData = json_encode($data);

        $headers = [
            'Authorization: key=' . $serverKey,
            'Content-Type: application/json',
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $encodedData);

        $result = curl_exec($ch);
        curl_close($ch);

        return $result;
    }
}