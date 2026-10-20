<?php

namespace App\Filament\Resources\Portfolios\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TagsInput;
use Illuminate\Support\Str;

class PortfoliosForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (string $operation, $state, callable $set) => $operation === 'create' ? $set('slug', Str::slug($state)) : null),

                TextInput::make('slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(table: 'portfolios', column: 'slug', ignoreRecord: true)
                    ->validationMessages([
                        'unique' => 'Slug ini sudah digunakan, silakan gunakan title/slug yang lain.',
                    ]),

                Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),

                FileUpload::make('thumbnail')
                    ->image()
                    ->disk('public')
                    ->directory('portfolios')
                    ->required(),

                TextInput::make('project_url')
                    ->url()
                    ->required(),

                TextInput::make('github_url')   
                    ->url()
                    ->required(),

                Select::make('category')
                    ->options([
                        'Freelance' => 'Freelance',
                        'Desktop Application' => 'Desktop Application',
                        'Mobile Application' => 'Mobile Application',
                        'Web Application' => 'Web Application',
                        'Plugin / Extension' => 'Plugin / Extension',
                    ])
                    ->required(),
            ]);
    }
}