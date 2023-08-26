<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ContactNumber implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public $valid_bd_contact_number_code = [];
    public function __construct()
    {
        $this->valid_bd_contact_number_code = [
            '017','018','019','016','011','013'
        ];
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return in_array(substr($value,0,3),$this->valid_bd_contact_number_code);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The Contact Number is Not Valid.';
    }
}
