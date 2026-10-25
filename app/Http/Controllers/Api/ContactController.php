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

        Mail::to($contact->email)
            ->send(new ContactFormSubmitted($contact));

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
}