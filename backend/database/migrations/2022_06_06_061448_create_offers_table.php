<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOffersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('p_id')->nullable();
            $table->string('name')->nullable();
            $table->string('percentage')->nullable();
            $table->string('image_type')->nullable();
            $table->string('image_path')->nullable();
            $table->string('image_stored_name')->nullable();
            $table->string('image_original_name')->nullable();
            $table->string('image_size')->nullable()->comment('in MB');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('offers');
    }
}
