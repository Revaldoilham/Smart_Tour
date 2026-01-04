<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Destinations
        Schema::create('destinations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('address');
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->string('category');
            $table->enum('type', ['indoor', 'outdoor']);
            $table->string('opening_hours')->nullable();
            $table->integer('ticket_price')->default(0);
            $table->string('image_url')->nullable();
            $table->timestamps();
        });

        // Weather Logs
        Schema::create('weather_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('destination_id')->constrained('destinations')->onDelete('cascade');
            $table->string('weather_main');
            $table->string('weather_description');
            $table->decimal('temp', 4, 2);
            $table->timestamp('recorded_at');
            $table->timestamps();
        });

        // Traffic Stats
        Schema::create('traffic_stats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('destination_id')->constrained('destinations')->onDelete('cascade');
            $table->enum('congestion_level', ['lancar', 'padat', 'macet']);
            $table->integer('travel_duration_from_city');
            $table->timestamp('recorded_at');
            $table->timestamps();
        });

        // Reviews
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('destination_id')->constrained('destinations')->onDelete('cascade');
            $table->integer('rating');
            $table->text('comment');
            $table->timestamps();
        });
        
        // Notifications
        Schema::create('notifications_log', function (Blueprint $table) {
             $table->id();
             $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
             $table->string('title');
             $table->text('body');
             $table->string('type');
             $table->boolean('is_read')->default(false);
             $table->timestamps();
        });

        // Add role to users if not exists
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('user');
            $table->text('fcm_token')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications_log');
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('traffic_stats');
        Schema::dropIfExists('weather_logs');
        Schema::dropIfExists('destinations');
        
        if (Schema::hasColumn('users', 'role')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn(['role', 'fcm_token']);
            });
        }
    }
};
